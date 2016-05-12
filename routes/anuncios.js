
module.exports = function (app) {

  const cfg = app.libs.config;
  const Anuncios = app.db.models.Anuncios;
  const Arquivos = app.db.models.Arquivos;
  const Logradouros = app.db.models.Logradouros;

  app.route(cfg.urlRaizApi + '/anuncios')
    .get(function get(req, res){

        // console.log(JSON.stringify(req.query));
        // A Implementar
        res.sendStatus(200).end();

      });

  app.route(cfg.urlRaizApi + '/anuncios/:_id')
    .get(function get(req, res){

      req.checkBody('_id','').notEmpty().isMongoId();

      var erros = req.validationErrors();

      if(!erros){

        Anuncios.findOne({_id: req.user._id})
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

      Anuncios.findOne({_id: req.user._id})
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

    });

  app.route(cfg.urlRaizApi + '/anuncios')
    .all(app.auth.authenticate('usuario'))
    .post(function get(req, res){

        req.checkBody('sobreTitulo','').notEmpty();
        req.checkBody('sobreDescricao','').notEmpty();

        var erros = req.validationErrors();

        if(!erros){

          req.body.etapa = ['logradouro','foto','valor'];

          Anuncios({
            sobreTitulo: req.body.sobreTitulo,
            sobreDescricao: req.body.sobreDescricao,
            etapa: req.body.etapa
          })
          .save(function (err, anuncio) {
            if(!err){
              res.status(200).json(anuncio).end();
            }else{
              res.sendStatus(412).end();
            }
          });

        }else{
          res.sendStatus(400).end();
        }
      })
    .put(function get(req, res){

        req.checkBody('_id').notEmpty().isMongoId();

        var erros = req.validationErrors();

        if(!erros){

          req.body.etapa = [];

          if(req.body.listaArquivos){
            if(req.body.listaArquivos.length){
              Arquivos.find({_id:{$nin: req.body.listaArquivos}})
              .then(function (arquivos) {

                if(arquivos && arquivos.length){

                  for (var i = 0; i < arquivos.length; i++) {

                    fs.unlink(arquivos[i].path, function (err) {
                      if(err){
                        console.log(err);
                      }else{
                        console.log(arquivos[i].path + ' deletato.');
                      }
                    });
                  }
                }

              }).catch(function (err) {
                res.sendStatus(404).end();
              });

            }else{
              req.body.etapa.push('fotos');
            }
          }else{
            req.body.etapa.push('fotos');
          }

          if(!req.body.preco){
              req.body.etapa.push('preco');
          }

          Logradouros.findOne({anuncio: req.body._id, usuario: req.user._id})
            .then(function (logradouro) {
              if(!logradouro){
                req.body.etapa.push('logradouro');
              }
            }).catch(function (err) {
              req.body.etapa.push('logradouro');
              console.log(err);
            });


          Anuncios.update({_id: req.body._id, usuario: req.user._id}, req.body)
            .then(function (anuncio) {
              res.sendStatus(200).end();
            }).catch(function (err) {
              res.sendStatus(412).end();
            });

        }else{
          res.sendStatus(400).end();
        }

      });

};
