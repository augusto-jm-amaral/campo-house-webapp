const nodemailer = require('nodemailer'),
    fs = require('fs');

module.exports = function(app) {

    const cfg = app.libs.config;
    const Anuncios = app.db.models.Anuncios;
    const Mensagens = app.db.models.Mensagens;
    const Usuarios = app.db.models.Usuarios;
    const Chat = app.db.models.Chat;

    var transporter = nodemailer.createTransport({
        host: 'smtp.mail.pawnmail.com',
        port: 587,
        // secure: false,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: 'campohouse@campohouse.com.br',
            pass: 'campohouse1'
        }
    });

    app.route(cfg.urlRaizApi + '/anuncios/:_id/mensagem')
        .all(app.auth.authenticate('usuario'))
        .post(function(req, res) {

            req.checkParams('_id', '').notEmpty().isMongoId();
            req.checkBody('texto', '').notEmpty();

            var erros = req.validationErrors();

            if (!erros) {

                Anuncios.findOne({
                        _id: req.params._id
                    })
                    .populate({
                        path: 'usuario',
                        model: 'Usuarios',
                        select: {
                            nome: 1,
                            email: 1
                        }
                    })
                    .then(function(anuncio) {

                        if (anuncio) {

                            Chat.findOne({
                                    de: req.user._id,
                                    para: anuncio.usuario._id
                                })
                                .then(function(chat) {
                                    if (chat) {

                                        new Mensagens({
                                            texto: req.body.texto,
                                            usuario: req.user._id,
                                            chat: chat._id
                                        }).save(function(err) {
                                            if (err)
                                                console.log(err);
                                        });

                                        // chat.countNew + 1;
                                        // chat.save(function (err) {
                                        //
                                        // });
                                        Chat.update({
                                            _id: chat._id
                                        }, {
                                            $inc: {
                                                countNewDe: 1
                                            }
                                        }).exec();

                                        enviarEmailMensagem(anuncio.usuario);
                                        res.sendStatus(200).end();


                                    } else {
                                        new Chat({
                                            de: req.user._id,
                                            para: anuncio.usuario._id,
                                            anuncio: anuncio._id,
                                            countNewDe: 1
                                        }).save(function(err, chat) {

                                            console.log(chat);

                                            if (!err) {

                                                new Mensagens({
                                                    texto: req.body.texto,
                                                    usuario: req.user._id,
                                                    chat: chat._id
                                                }).save(function(err) {
                                                    if (err)
                                                        console.log(err);
                                                });

                                                // chat.countNew + 1;
                                                // chat.save();
                                                // Chat.update(
                                                //    { _id: chat._id },
                                                //    { $inc: { countNew: 1} }
                                                // ).exec();

                                                enviarEmailMensagem(anuncio.usuario);
                                                res.sendStatus(200).end();

                                            } else {
                                                console.log(err);
                                                res.sendStatus(412).end();
                                            }
                                        });
                                    }
                                })
                                .catch(function(err) {
                                    console.log(err);
                                    res.sendStatus(412).end();
                                });

                        } else {
                            console.log(err);
                            res.sendStatus(412).end();
                        }

                    }).catch(function(err) {
                        console.log(err);
                        res.sendStatus(412).end();
                    });

            } else {
                console.log(erros);
                res.sendStatus(400).end();
            }

        });




    function enviarEmailMensagem(usuario) {

        var site = 'http://www.campohouse.com.br';

        var textEmail = 'Olá ' + usuario.nome.split(' ')[0] + '!<br>' +
            'Você acaba de receber uma nova mensagem de alguém que está interessado em seu imóvel. Veja <a href="' + site + '/#/caixademensagens' + '">aqui</a>.<br>' +
            'Grande abraço,<br>' +
            'Equipe Campo House.';

        fs.readFile('./libs/template-email.html', 'utf8', function(err, data) {

            var mailOptions = {
                from: 'CampoHouse	<campohouse@campohouse.com.br>',
                to: usuario.email,
                subject: 'Bem Vindo a Campo House',
                html: data.replace('*.&123456789*.&', textEmail)
                    // html: 'teste'
            };

            var sendMail = transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email	enviado:	' + info.response);
                }
            });

        });
    };

    app.route(cfg.urlRaizApi + '/mensagens/:_id')
        .all(app.auth.authenticate('usuario'))
        .get(function(req, res) {

            req.checkParams('_id', '').notEmpty().isMongoId();

            var erros = req.validationErrors();

            Chat.update({
                    _id: req.params._id
                }, {
                    countNew: 0
                })
                .exec();

            if (!erros) {

                Mensagens.find({
                        chat: req.params._id
                    })
                    .sort({
                        data: 1
                    })
                    .populate({
                        path: 'usuario',
                        model: 'Usuarios',
                        select: {
                            nome: 1,
                            email: 1
                        }
                    })
                    .then(function(mensagens) {
                        res.status(200).json(mensagens).end();
                    }).catch(function(err) {
                        console.log(err);
                        res.sendStatus(412).end();
                    });

            } else {
                console.log(erros);
                res.sendStatus(400).end();
            }
        });

    app.route('/meuid')
        .all(app.auth.authenticate('usuario'))
        .get(function(req, res) {

            res.status(200).json({
                _id: req.user._id
            });
        });

    app.route('/mensagem/resposta/:_id')
        .all(app.auth.authenticate('usuario'))
        .post(function(req, res) {

            req.checkParams('_id', '').notEmpty().isMongoId();
            req.checkBody('texto', '').notEmpty();

            var erros = req.validationErrors();

            if (!erros) {


                Chat.findOne({
                        _id: req.params._id
                    })
                    .populate([{
                        path: 'para',
                        model: 'Usuarios',
                        select: {
                            nome: 1,
                            email: 1
                        }
                    }, {
                        path: 'de',
                        model: 'Usuarios',
                        select: {
                            nome: 1,
                            email: 1
                        }
                    }])
                    .then(function(chat) {
                        if (chat) {

                            new Mensagens({
                                texto: req.body.texto,
                                usuario: req.user._id,
                                chat: chat._id
                            }).save(function(err) {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(412).end();
                                } else {

                                    Mensagens.find({
                                            chat: chat._id
                                        })
                                        .sort({
                                            data: 1
                                        })
                                        .populate({
                                            path: 'usuario',
                                            model: 'Usuarios',
                                            select: {
                                                nome: 1,
                                                email: 1
                                            }
                                        })
                                        .then(function(mensagens) {
                                            res.status(200).json(mensagens).end();
                                        }).catch(function(err) {
                                            console.log(err);
                                            res.sendStatus(412).end();
                                        });

                                }
                            });

                            Chat.update({
                                _id: chat._id
                            }, {
                                $inc: {
                                    countNewPara: 1
                                }
                            }).exec();

                            enviarEmailMensagem(chat.de);


                        } else {
                            console.log(err);
                            res.sendStatus(412).end();

                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                        res.sendStatus(412).end();
                    });


            } else {
                console.log(erros);
                res.sendStatus(400).end();
            }

        });

    app.route(cfg.urlRaizApi + '/mensagens')
        .all(app.auth.authenticate('usuario'))
        .get(function(req, res) {

            Chat.find({
                    $or: [{
                        de: req.user._id
                    }, {
                        para: req.user._id
                    }]
                })
                .sort({
                    countNew: -1
                })
                .populate([{
                    path: 'de',
                    model: 'Usuarios',
                    select: {
                        nome: 1,
                        email: 1
                    }
                }, {
                    path: 'para',
                    model: 'Usuarios',
                    select: {
                        nome: 1,
                        email: 1
                    }
                }, {
                    path: 'anuncio',
                    model: 'Anuncios'
                }])
                .then(function(chats) {

                    res.status(200).json(chats).end();

                }).catch(function(err) {
                    console.log(err);
                    res.sendStatus(412).end();

                });

        });

};
