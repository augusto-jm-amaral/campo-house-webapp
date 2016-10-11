const multer = require('multer');
const fs = require('fs');

module.exports = function(app) {

    const cfg = app.libs.config;
    const Anuncios = app.db.models.Anuncios;
    const Arquivos = app.db.models.Arquivos;
    // const Logger = app.libs.logger;


    var storage = multer.diskStorage({
        fileFilter: function(req, file, cb) {


            req.checkParams('_id', '').notEmpty().isMongoId();
            req.checkQuery('width', '').notEmpty().isNumeric();
            req.checkQuery('height', '').notEmpty().isNumeric();

            var erros = req.validationErrors();

            app.libs.logger.error(erros);

            if (!erros) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        },
        destination: function(req, file, cb) {

            cb(null, '/imgs');

        },
        filename: function(req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.mimetype.split('/')[file.mimetype.split('/').length - 1]);
        }
    });

    var upload = multer({
        storage: storage,
        limits: {
            fields: 1,
            files: 1,
            fileSize: 51200000000
        }
    }).single('file');

    app.route(cfg.urlRaizApi + '/anuncios/:_id/imagens')
        .all(app.auth.authenticate('usuario'))
        .post(upload, function(req, res) {

            if (req.file) {

                Arquivos.count({
                    anuncio: req.params._id
                }, function(err, count) {

                    if (count < cfg.numMaxFotos) {

                        new Arquivos({
                                nome: req.file.originalname,
                                width: req.query.width,
                                height: req.query.height,
                                path: req.file.filename,
                                formato: req.file.mimetype,
                                anuncio: req.params._id,
                                usuario: req.user._id
                            })
                            .save()
                            .then(function(img) {

                                // console.log(req.params._id);

                                Anuncios.findOne({
                                        _id: req.params._id,
                                        usuario: req.user._id
                                    })
                                    .then(function(anuncio) {
                                        if (anuncio) {
                                            anuncio.listaArquivos.push(img);
                                            anuncio.save()
                                                .then(function(anuncio) {
                                                    Anuncios.findOne({
                                                            _id: req.params._id,
                                                            usuario: req.user._id
                                                        })
                                                        .populate('listaArquivos')
                                                        .then(function(anuncio) {
                                                            res.status(200).json(anuncio).end();;
                                                        }).catch(function(err) {
                                                            app.libs.logger.error(err);
                                                            res.sendStatus(412).end();
                                                        });
                                                }).catch(function(err) {
                                                    app.libs.logger.error(err);
                                                    res.sendStatus(412).end();
                                                })
                                        } else {
                                            app.libs.logger.error(anuncio);
                                            res.sendStatus(412).end();
                                        }
                                    })
                                    .catch(function(err) {
                                        app.libs.logger.error(err);
                                        res.sendStatus(412).end();
                                    });

                                // res.status(200).json({}).end();
                            }).catch(function(err) {
                                app.libs.logger.error(err);
                                res.sendStatus(412).end();
                            });

                    } else {
                        res.sendStatus(400);
                    }

                });

            } else {
                app.libs.logger.error(erros);
                res.sendStatus(400).end();
            }
        });

    app.route(cfg.urlRaizApi + '/anuncios/:_idanuncio/imagens/:_idimagem')
        .all(app.auth.authenticate('usuario'))
        .delete(upload, function(req, res) {

            req.checkParams('_idimagem', '').notEmpty().isMongoId();
            req.checkParams('_idanuncio', '').notEmpty().isMongoId();

            var erros = req.validationErrors();

            if (!erros) {
                Arquivos.findOne({
                        _id: req.params._idimagem,
                        anuncio: req.params._idanuncio,
                        usuario: req.user._id
                    })
                    .then(function(imagem) {

                        if (imagem) {
                            fs.unlink('/imgs/' + imagem.path, function(err) {
                                Arquivos.remove({
                                    _id: req.params._idimagem,
                                    anuncio: req.params._idanuncio,
                                    usuario: req.user._id
                                }, function(err) {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(412).end();
                                    } else {

                                        Anuncios.update({
                                                _id: req.params._idanuncio,
                                                usuario: req.user._id
                                            }, {
                                                $pull: {
                                                    listaArquivos: req.params._idimagem
                                                }
                                            },
                                            function(err) {
                                                if (err) {
                                                    console.log(err);
                                                    res.sendStatus(412).end();
                                                } else {
                                                    res.sendStatus(200).end();
                                                }
                                            }
                                        );
                                    }
                                });
                                // }
                            });

                        } else {
                            res.sendStatus(412).end();
                        }

                    }).catch(function(err) {
                        console.log(err);
                        res.sendStatus(412).end();
                    })
            } else {
                console.log(erros);
                res.sendStatus(400).end();
            }

        });

};
