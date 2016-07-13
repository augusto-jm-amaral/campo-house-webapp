
module.exports = function (app) {

  const cfg = app.libs.config;
  const Anuncios = app.db.models.Anuncios;
  const Arquivos = app.db.models.Arquivos;
  const Logradouros = app.db.models.Logradouros;

  app.route(cfg.urlRaizApi + '/anuncios')
    .get(function get(req, res){

        // A Implementar
        res.sendStatus(200).end();

      });

  app.route(cfg.urlRaizApi + '/anuncios/:_id')
    .get(function get(req, res){

      req.checkParams('_id','').notEmpty().isMongoId();

      var erros = req.validationErrors();

      if(!erros){
        Anuncios.findOne({_id: req.params._id, status: 1})
        .populate([
          {path: 'listaArquivos', model: 'Arquivos'},
          {path: 'listaPrecosTemporadas', model: 'PrecosTemporadas'},
          {path: 'listaComentarios', model: 'Comentarios'},
          {path: 'AnuncioComodidades', model: 'listaComodidades'},
          {path: 'anuncioOfertaValores', model: 'AnuncioOfertaValores'},
          {path: 'anuncioEspacos', model: 'AnuncioEspacos'}
        ])
        .then(function (anuncio) {
          if(anuncio){
            res.status(200).json(anuncio).end();
          }else{
            res.sendStatus(404).end();
          }
        })
        .catch(function (err) {
          console.log(err);
          res.sendStatus(412).end();
        });

      }else{
        res.sendStatus(400).end();
      }

    });

  app.route(cfg.urlRaizApi + '/anuncios/:_id')
    .all(app.auth.authenticate('usuario'))
    .delete(function get(req, res){

      req.checkBody('_id','').notEmpty().isMongoId();

      var erros = req.validationErrors();

      if(!erros){

        Anuncios.findOne({_id: req.user._id})
        .then(function (anuncio) {
          if(anuncio){

            anuncio.status = 0;
            anuncio.save(function (err, anuncio) {
              if(!err){
                res.sendStatus(200).end();
              }else{
                res.sendStatus(412).end();
              }
            });
          }else{
            res.sendStatus(404).end();
          }
        })
        .catch(function (err) {
          console.log(err);
          res.sendStatus(412).end();
        });

      }else{
        res.sendStatus(400).end();
      }

    });

  app.route(cfg.urlRaizApi + '/anuncios')
    .all(app.auth.authenticate('usuario'))
    .post(function get(req, res){

        req.checkBody('sobreTitulo','').notEmpty();
        req.checkBody('sobreDescricao','').notEmpty();

        var erros = req.validationErrors();

        if(!erros){

          Anuncios({
            sobreTitulo: req.body.sobreTitulo,
            sobreDescricao: req.body.sobreDescricao,
            usuario: req.user._id
          })
          .save(function (err, anuncio) {
            if(!err){
              res.status(200).json(anuncio).end();
            }else{
              console.log(err);
              res.sendStatus(412).end();
            }
          });

        }else{
          res.sendStatus(400).end();
        }

      });

    app.route(cfg.urlRaizApi + '/anuncios/:_id')
    .all(app.auth.authenticate('usuario'))
    .put(function get(req, res){

        req.checkParams('_id').notEmpty().isMongoId();

        var erros = req.validationErrors();

        if(!erros){

              Anuncios.update(
                {_id: req.params._id, usuario: req.user._id},
                { $set: {
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
                   listaArquivos: req.body.listaArquivos,
                   listaPrecosTemporadas: req.body.listaArquivos,
                   listaComentarios: req.body.listaComentarios,
                  //  listaComodidades: req.body.listaComodidades,
                   anuncioOfertaValores: req.body.anuncioOfertaValores,
                   anuncioEspacos: req.body.anuncioOfertaValores,
                   dataAtualizacao: new Date()
                 }},
                function (err) {
                  if(err){
                    console.log(err);
                    res.sendStatus(412);
                  }else{
                    Anuncios.findOne({_id: req.params._id, usuario: req.user._id}, function (err, anuncio) {
                      res.status(200).json(anuncio);
                    });
                  }
              });

        }else{
          res.sendStatus(400).end();
        }

      });

};
