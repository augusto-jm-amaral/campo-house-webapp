module.exports = function(app) {

    const cfg = app.libs.config;
    const Comodidades = app.db.models.Comodidades;
    const AnuncioComodidades = app.db.models.AnuncioComodidades;
    const Anuncios = app.db.models.Anuncios;


    app.route(cfg.urlRaizApi + '/anuncios/comodidades')
        .get(function get(req, res) {

            Comodidades.find({})
                .then(function(comodidades) {

                    res.status(412).json(comodidades).end();

                }).catch(function(err) {
                    app.libs.logger.error(err);
                    res.sendStatus(412).end();
                });

        });

    app.route(cfg.urlRaizApi + '/anuncios/:_id/comodidades')
        .post(function get(req, res) {

            req.checkParams('_id', '').notEmpty().isMongoId();
            req.checkBody('comodidade', '').notEmpty().isMongoId();

            var erros = req.validationErrors();

            if (!erros) {

                Anuncios.findOne({
                        _id: req.params._id,
                        usuario: req.user._id
                    })
                    .then(function(anuncio) {

                        if (anuncio) {

                            new AnuncioComodidades({
                                descricao: req.body.descricao ? req.body.descricao : '',
                                comodidade: req.body.comodidade,
                                anuncio: anuncio._id,
                                usuario: req.user_id
                            }).save(function(err, anuncioComodidade) {
                                if (err) {
                                    app.libs.logger.error(err);
                                    res.sendStatus(412).end();
                                } else {
                                    Anuncios.update({
                                            _id: anuncio._id,
                                            usuario: req.user_id
                                        }, {
                                            $push: {
                                                listaAnuncioComodidades: {
                                                    $each: [anuncioComodidade._id]
                                                }
                                            }
                                        })
                                        .then(function() {
                                            res.status(200).json(anuncioComodidade).end();
                                        }).catch(function(err) {
                                            app.libs.logger.error(err);
                                            res.sendStatus(412).end();
                                        });
                                }
                            });
                        } else {
                            res.sendStatus(400).end();
                        }
                    })
                    .catch(function(err) {
                        app.libs.logger.error(err);
                        res.sendStatus(400).end();
                    });

            } else {
                app.libs.logger.error(erros);
                res.sendStatus(400).end();
            }
        });

    app.route(cfg.urlRaizApi + '/anuncios/:_idanuncio/comodidades/:_idcomodidade')
        .all(app.auth.authenticate('usuario'))
        .delete(function get(req, res) {

            req.checkParams('_idanuncio', '').notEmpty().isMongoId();
            req.checkParams('_idcomodidade', '').notEmpty().isMongoId();

            var erros = req.validationErrors();

            if (!erros) {

                AnuncioComodidades.remove({
                    _id: req.params._idcomodidade,
                    usuario: req.user_id
                }).then(function(anuncioComodidade) {
                    Anuncios.update({
                        _id: req.params._idanuncio,
                        usuario: req.user._id
                    }).then(function(anuncio) {
                        res.sendStatus(200).end();
                    }).catch(function(err) {
                        app.libs.logger.error(err);
                        res.sendStatus(412).end();
                    })
                }).catch(function(err) {
                    app.libs.logger.error(err);
                    res.sendStatus(412).end();
                })
            } else {
                res.sendStatus(400).end();
            }
        })
        .put(function get(req, res) {

            req.checkParams('_idanuncio', '').notEmpty().isMongoId();
            req.checkParams('_idcomodidade', '').notEmpty().isMongoId();

            var erros = req.validationErrors();

            if (!erros) {

                AnuncioComodidades.update({
                    _id: req.params._idcomodidade,
                    anuncio: req.params._idanuncio,
                    usuario: req.user._id
                }, {
                    descricao: req.body.descricao
                }).then(function(anuncioComodidade) {
                    res.status(200).json(anuncioComodidade).end();
                }).catch(function(err) {
                    app.libs.logger.error(err);
                    res.sendStatus(412).end();
                })

            } else {
                res.sendStatus(400).end();
            }

        });

};
