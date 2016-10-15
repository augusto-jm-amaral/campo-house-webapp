const nodemailer = require('nodemailer'),
    bcrypt = require('bcrypt-nodejs'),
    fs = require('fs');

module.exports = function(app) {

    // const cfg = app.libs.config;
    const Usuarios = app.db.models.Usuarios;
    const Planos = app.db.models.Planos;

    var transporter = nodemailer.createTransport({
        host: 'smtp.mail.pawnmail.com',
        port: 587,
        requireTLS: true,
          // secure: false,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: 'campohouse@campohouse.com.br',
            pass: 'campohouse1'
        }
    });

    app.route('/usuarios/validaremail/:_hash')
        .get(function get(req, res) {

            req.checkParams('_hash', '').notEmpty();

            var erros = req.validationErrors();

            if (!erros) {

                Usuarios.findOne({
                    chaveAcesso: req.params._hash
                }, function(err, usuario) {

                    if (!err && usuario) {
                        usuario.bloqueado = false;
                        usuario.save(function(err) {
                            if (!err) {
                                res.sendStatus(200).end();
                            } else {
                                app.libs.logger.error(err);
                                res.sendStatus(412).end();
                            }
                        });
                    } else {
                        app.libs.logger.error(err);
                        res.sendStatus(412).end();
                    }
                });

            } else {
                res.sendStatus(400).end();
            }
        });

    app.route('/usuarios/:_id')
        .get(function get(req, res) {

            req.checkParams('_id', '').notEmpty().isMongoId();
            // req.checkQuery('p', '').notEmpty().isBoolean();

            var erros = req.validationErrors();

            if (!erros) {

                var query = Usuarios.findOne({
                        _id: req.params._id
                    })
                    .select({
                        nome: 1,
                        sobreNome: 1,
                        dataNascimento: 1,
                        email: 1,
                        telefone: 1,
                        sobre: 1,
                        anuncios: 1
                    });

                // if (req.query.p)
                //     query.populate('anuncios');

                query.then(function(usuario) {
                    
                    if (usuario) {
                        res.status(200).json(usuario).end();
                    } else {
                        res.sendStatus(404).end();
                    }
                }).catch(function(err) {
                    app.libs.logger.error(err);
                    res.sendStatus(412).end();
                });

            } else {
                app.libs.logger.error(erros);
                res.sendStatus(400).end();
            }
        }).put(function (req, res) {

            req.checkParams('_id', '').notEmpty().isMongoId();

            var erros = req.validationErrors();

            if (!erros) {

                var update = {
                    nome: req.body.nome,
                    email: req.body.email,
                    telefone: req.body.telefone,
                    sobre: req.body.sobre
                };

                if(req.body.senha){
                    var salt = bcrypt.genSaltSync();
                    update.senha = bcrypt.hashSync(req.body.senha, salt);
                }

                Usuarios.update({ _id: req.params._id }, update)
                .then(function(usuario) {
                    res.status(200).end();
                }).catch(function(err) {
                    app.libs.logger.error(err);
                    res.sendStatus(412).end();
                });

            } else {
                app.libs.logger.error(erros);
                res.sendStatus(400).end();
            }
        });

    app.route('/usuarios')
        .post(function get(req, res) {

            req.checkBody('nome', '').notEmpty().isName();
            req.checkBody('email', '').notEmpty().isEmail();
            req.checkBody('senha', '').notEmpty().isPassword();
            req.checkBody('telefone', '').notEmpty().isNumeric();

            var erros = req.validationErrors();

            if (!erros) {

                var chaveHash = req.body.nome + req.body.email;
                var salt = bcrypt.genSaltSync();

                req.body.chaveAcesso = bcrypt.hashSync(chaveHash, salt).replace(/\//g, 'x').replace(/&/g, 'l');

                Usuarios.count({}, function(err, num) {

                    var nomePlano = '';

                    if (num > 50)
                        nomePlano = 'Free';
                    else
                        nomePlano = 'Promo Lançamento';

                    app.libs.logger.error(nomePlano);

                    Planos.findOne({
                        nome: nomePlano
                    }, function(err, plano) {

                        app.libs.logger.error(err);
                        app.libs.logger.error(plano);

                        var data = new Date();

                        req.body.plano = plano._id;
                        req.body.planoIni = data;

                        if (nomePlano == 'Free')
                            req.body.planoFin = new Date((data.getTime() + plano.duracao));
                        else
                            req.body.planoFin = new Date(plano.duracao);


                        var usuario = new Usuarios(req.body);

                        usuario = usuario.encripitarSenha(usuario);

                        usuario.save(function(err) {
                            if (err) {
                                app.libs.logger.error(err);
                                res.sendStatus(412).end();
                            } else {

                                var site = 'http://www.campohouse.com.br';

                                var textEmail = '<h1><span style="font-size:22px">Olá ' + usuario.nome + '! Seja bem-vindo(a).</span></h1>&nbsp;' +
                                    '<h4>Seu cadastro foi realizado com sucesso.<br>' +
                                    '<br>' +
                                    'Por questões de segurança, pedimos que confirme seu cadastro clicando <a href="'+ site +'/#/validarcadastro/'+ req.body.chaveAcesso +'"  target="_blank">aqui</a>.<br>' +
                                    '<br>' +
                                    'Agora você já pode desfrutar de todos nossos recursos.<br>' +
                                    '<br>' +
                                    'A partir de agora você já ganhou 30 dias GRÁTIS para anunciar seu imóvel.<br>' +
                                    'Clique <a href="' + site + '/#/anunciar" target="_blank" >aqui</a> e anuncie já, é rápido.<br>' +
                                    '<br>' +
                                    'Quaisquer dúvidas ou sugestões, <a href="' + site + '/#/faleconosco" >fale conosco</a>, ficaremos honrados em atendê-lo.<br>' +
                                    '<br>' +
                                    'Grande abraço,<br>' +
                                    'Equipe Campo House.</h4>';

                                fs.readFile('./libs/template-email.html', 'utf8', function(err, data) {

                                    var mailOptions = {
                                        from: 'CampoHouse	<campohouse@campohouse.com.br>',
                                        to: req.body.email,
                                        subject: 'Bem Vindo a Campo House',
                                        html: data.replace('*.&123456789*.&', textEmail)
                                            // html: 'teste'
                                    };

                                    var sendMail = transporter.sendMail(mailOptions, function(error, info) {
                                        if (error) {
                                            app.libs.logger.error(error);
                                        } else {
                                            app.libs.logger.warn('Email	enviado:	' + info.response);
                                        }
                                    });

                                });

                                res.sendStatus(200).end();
                            }
                        });

                    });

                });

            } else {
                app.libs.logger.error(erros);
                res.sendStatus(400).end();
            }
        });

};
