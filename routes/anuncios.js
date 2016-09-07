module.exports = function(app) {

    const cfg = app.libs.config;
    const Anuncios = app.db.models.Anuncios;
    const Arquivos = app.db.models.Arquivos;
    const Logradouros = app.db.models.Logradouros;
    const TipoImovelOption = app.db.models.TipoImovelOption;
    const NumAcomodaOption = app.db.models.NumAcomodaOption;
    const ObjectId = app.db.Types.ObjectId;

    app.route(cfg.urlRaizApi + '/anuncios')
        .get(function get(req, res) {

            var limite = 9;
            var pagina = req.query.pagina;
            var skip = ((pagina - 1) * limite);

            var busca = {};
            var buscaEndereco = {};
            var buscaNumAcomoda = {};

            if (req.query.cidade) {
                eval('buscaEndereco.localCidade = /' + req.query.cidade + '/i;');
                // buscaEndereco.localCidade = req.query.cidade;
            }

            if (req.query.numQuartos) {
                busca.numQuartos = {
                    $gte: req.query.numQuartos
                };
            }
            if (req.query.valor) {
                busca.precoDiaria = {
                    $lte: req.query.valor
                };
            }
            if (req.query.hospedes) {
                buscaNumAcomoda = {
                    $or: [{
                        num: {
                            $gte: parseInt(req.query.hospedes)
                        }
                    }, {
                        num: 99
                    }]
                };
            }

            Logradouros.aggregate(
                [{
                    $match: buscaEndereco
                }, {
                    $group: {
                        _id: null,
                        id: {
                            "$addToSet": "$anuncio"
                        }
                    }
                }]
            ).exec(function(err, idsAnuncios) {

                // console.log(idsAnuncios);

                if (idsAnuncios.length) {

                    busca._id = {
                        $in: idsAnuncios[0].id
                    };

                    console.log(buscaNumAcomoda);

                    NumAcomodaOption.aggregate(
                        [{
                            $match: buscaNumAcomoda
                        }, {
                            $group: {
                                _id: null,
                                id: {
                                    "$addToSet": "$_id"
                                }
                            }
                        }]
                    ).exec(function(err, idsNumAcodoma) {

                        console.log(idsNumAcodoma);

                        if (idsNumAcodoma) {

                            busca.numAcomoda = {
                                $in: idsNumAcodoma[0].id
                            };

                            console.log(busca);

                            Anuncios.count(busca)
                                .then(function(c) {

                                    if (c) {

                                        Anuncios.find(busca)
                                            .sort('sobreTitulo')
                                            .skip(skip)
                                            .limit(limite)
                                            .populate(['listaArquivos', 'numAcomoda'])
                                            .then(function(anuncios) {
                                                res.status(200).json({
                                                    count: c,
                                                    anuncios: anuncios
                                                }).end();
                                            })
                                            .catch(function(err) {
                                                console.log(err);
                                                res.sendStatus(412).end();
                                            });

                                    } else {
                                        res.json({
                                            count: 0,
                                            anuncios: []
                                        });
                                    }

                                }).catch(function(err) {
                                    console.log(err);
                                    res.sendStatus(412).end();
                                });

                        } else {
                            console.log(err);
                            res.sendStatus(412).end();
                        }

                    });

                } else {
                    res.json({
                        count: 0,
                        anuncios: []
                    });
                    // console.log(err);
                    // res.sendStatus(412).end();
                }

            });
            // }).catch(function (err) {
            //   console.log(err);
            //   res.sendStatus(412).end();
            // });


            // res.sendStatus(200).end();

        });

    app.route(cfg.urlRaizApi + '/anuncios/meusanuncios')
        .all(app.auth.authenticate('usuario'))
        .get(function get(req, res) {

            Anuncios.find({
                    usuario: req.user._id
                })
                .populate([{
                    path: 'usuario',
                    model: 'Usuarios',
                    select: {
                        nome: 1,
                        sobreNome: 1,
                        telefone: 1
                    }
                }, {
                    path: 'numAcomoda',
                    model: 'NumAcomodaOption'
                }, {
                    path: 'tipoImovel',
                    model: 'TipoImovelOption'
                }, {
                    path: 'listaArquivos',
                    model: 'Arquivos'
                }, {
                    path: 'listaComentarios',
                    model: 'Comentarios'
                }, {
                    path: 'listaComodidades',
                    model: 'Comodidades'
                }, {
                    path: 'listaOfertaValores',
                    model: 'AnuncioOfertaValores'
                }])
                .then(function(anuncios) {
                    res.status(200).json(anuncios).end();
                }).catch(function(err) {
                    console.log(err);
                    res.sendStatus(412).end();
                });

        });

    app.route(cfg.urlRaizApi + '/anuncios/:_id')
        .get(function get(req, res) {

            req.checkParams('_id', '').notEmpty().isMongoId();

            var erros = req.validationErrors();

            if (!erros) {
                Anuncios.findOne({
                        _id: req.params._id,
                        status: 1
                    })
                    .populate([{
                        path: 'usuario',
                        model: 'Usuarios',
                        select: {
                            nome: 1,
                            sobreNome: 1,
                            telefone: 1
                        }
                    }, {
                        path: 'numAcomoda',
                        model: 'NumAcomodaOption'
                    }, {
                        path: 'tipoImovel',
                        model: 'TipoImovelOption'
                    }, {
                        path: 'listaArquivos',
                        model: 'Arquivos'
                    }, {
                        path: 'listaComentarios',
                        model: 'Comentarios'
                    }, {
                        path: 'listaComodidades',
                        model: 'Comodidades'
                    }, {
                        path: 'listaOfertaValores',
                        model: 'AnuncioOfertaValores'
                    }])
                    .then(function(anuncio) {
                        if (anuncio) {
                            res.status(200).json(anuncio).end();
                        } else {
                            res.sendStatus(404).end();
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

    app.route(cfg.urlRaizApi + '/anuncios/:_id/edit')
        .all(app.auth.authenticate('usuario'))
        .get(function get(req, res) {

            req.checkParams('_id', '').notEmpty().isMongoId();

            var erros = req.validationErrors();

            if (!erros) {
                Anuncios.findOne({
                        _id: req.params._id,
                        usuario: req.user._id
                    })
                    .populate([{
                        path: 'usuario',
                        model: 'Usuarios',
                        select: {
                            nome: 1,
                            sobreNome: 1,
                            telefone: 1
                        }
                    }, {
                        path: 'listaArquivos',
                        model: 'Arquivos'
                    }])
                    .then(function(anuncio) {
                        if (anuncio) {
                            res.status(200).json(anuncio).end();
                        } else {
                            res.sendStatus(404).end();
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

    app.route(cfg.urlRaizApi + '/anuncios/:_id')
        .all(app.auth.authenticate('usuario'))
        .delete(function get(req, res) {

            req.checkBody('_id', '').notEmpty().isMongoId();

            var erros = req.validationErrors();

            if (!erros) {

                Anuncios.findOne({
                        _id: req.params._id,
                        usuario: req.user._id
                    })
                    .then(function(anuncio) {
                        if (anuncio) {

                            anuncio.status = 0;
                            anuncio.save(function(err, anuncio) {
                                if (!err) {
                                    res.sendStatus(200).end();
                                } else {
                                    res.sendStatus(412).end();
                                }
                            });
                        } else {
                            res.sendStatus(404).end();
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                        res.sendStatus(412).end();
                    });

            } else {
                res.sendStatus(400).end();
            }

        });

    app.route(cfg.urlRaizApi + '/anuncios')
        .all(app.auth.authenticate('usuario'))
        .post(function get(req, res) {

            req.checkBody('sobreTitulo', '').notEmpty();
            req.checkBody('sobreDescricao', '').notEmpty();

            var erros = req.validationErrors();

            if (!erros) {

                Anuncios({
                        sobreTitulo: req.body.sobreTitulo,
                        sobreDescricao: req.body.sobreDescricao,
                        usuario: req.user._id,
                        tipoImovel: new ObjectId(req.body.tipoImovel),
                        numAcomoda: new ObjectId(req.body.numAcomoda)
                    })
                    .save(function(err, anuncio) {
                        if (!err) {
                            res.status(200).json(anuncio).end();
                        } else {
                            console.log(err);
                            res.sendStatus(412).end();
                        }
                    });

            } else {
                console.log(erros);
                res.sendStatus(400).end();
            }

        });

    app.route(cfg.urlRaizApi + '/anuncios/:_id')
        .all(app.auth.authenticate('usuario'))
        .put(function get(req, res) {

            req.checkParams('_id').notEmpty().isMongoId();

            var erros = req.validationErrors();

            if (!erros) {

                Anuncios.update({
                        _id: req.params._id,
                        usuario: req.user._id
                    }, {
                        $set: {
                            sobreTitulo: req.body.sobreTitulo,
                            sobreDescricao: req.body.sobreDescricao,
                            regrasGerais: req.body.regrasGerais,
                            precoDiaria: req.body.precoDiaria ? req.body.precoDiaria : 0,
                            precoSemanal: req.body.precoSemanal ? req.body.precoSemanal : 0,
                            precoMensal: req.body.precoMensal ? req.body.precoMensal : 0,
                            localComplemento: req.body.localComplemento,
                            numQuartos: req.body.numQuartos,
                            numBanheiros: req.body.numBanheiros,
                            numCamas: req.body.numCamas,
                            numMaxVisitantes: req.body.numMaxVisitantes,
                            tipoImovel: new ObjectId(req.body.tipoImovel),
                            numAcomoda: new ObjectId(req.body.numAcomoda),
                            oquenaolevar: req.body.oquenaolevar,
                            oquelevar: req.body.oquelevar,
                            //  listaArquivos: req.body.listaArquivos,
                            listaComodidades: req.body.listaComodidades,
                            listaPrecosTemporadas: req.body.listaArquivos,
                            listaComentarios: req.body.listaComentarios,
                            listaOfertaValores: req.body.listaOfertaValores,
                            anuncioEspacos: req.body.anuncioOfertaValores,
                            dataAtualizacao: new Date()
                        }
                    },
                    function(err) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(412);
                        } else {
                            Anuncios.findOne({
                                    _id: req.params._id,
                                    usuario: req.user._id
                                })
                                .populate([{
                                    path: 'usuario',
                                    model: 'Usuarios',
                                    select: {
                                        nome: 1,
                                        sobreNome: 1,
                                        telefone: 1
                                    }
                                }, {
                                    path: 'listaArquivos',
                                    model: 'Arquivos'
                                }])
                                .then(function(anuncio) {
                                    res.status(200).json(anuncio).end();
                                }).catch(function(err) {
                                    res.sendStatus(412).end();
                                });
                        }
                    });

            } else {
                console.log(erros);
                res.sendStatus(400).end();
            }

        });

};