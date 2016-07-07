const multer = require('multer');
const fs = require('fs');

module.exports = function (app) {

  const cfg = app.libs.config;
  const Anuncios = app.db.models.Anuncios;
  const Arquivos = app.db.models.Arquivos;

  var limits = { fileSize: 1024 * 5} // 4 mb

  var storage = multer.diskStorage({
    fileFilter: function (req, file, cb) {

      req.checkParams('_id','').notEmpty().isMongoId();

      var erros = req.validationErrors();

      if(!erros){
        cb(null, true);
      }else{
        cb(null, false);
      }
    },
    destination: function (req, file, cb) {

        cb(null, '/imganuncio');

    },
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
  });

  var upload = multer({ storage: storage, limits: limits }).single('file');

  app.route(cfg.urlRaizApi + '/anuncios/:_id/imagens/')
    .all(app.auth.authenticate('usuario'))
    .post( upload ,function (req, res) {

      if(req.file){

        Arquivos.count({anuncio: req.params._id}, function (err, count) {

          if(count < cfg.numMaxFotos){

            new Arquivos({
              nome: req.file.originalname,
              url: '/imganuncio/' + req.file.filename,
              formato: req.file.mimetype,
              anuncio: req.params._id,
              usuario: req.user._id
            })
            .save()
            .then(function (img) {

              Anuncios.findOne({_id: req.params._id, usuario: req.user._id})
                .then(function (anuncio) {
                  if(anuncio){
                    anuncio.listaArquivos.push(img);
                    anuncio.save()
                      .then(function (anuncio) {
                        res.status(200).json(anuncio);
                      }).catch(function (err) {
                        console.log(err);
                        res.sendStatus(412).end();
                      })
                  }else{
                    res.sendStatus(412).end();
                  }
                })
                .catch(function (err) {
                  console.log(err);
                  res.sendStatus(412).end();
                });

              res.status(200).json({_id: img._id}).end();
            }).catch(function (err) {
              console.log(err);
              res.sendStatus(412).end();
            });

          }else{
            res.sendStatus(400);
          }

        });

      }else{
        console.log(erros);
        res.sendStatus(400).end();
      }
    });

  app.route(cfg.urlRaizApi + '/anuncios/:_idanuncio/imagens/:_idimagem')
    .all(app.auth.authenticate('usuario'))
    .delete( upload ,function (req, res) {

      req.checkParams('_idimagem','').notEmpty().isMongoId();
      req.checkParams('_idanuncio','').notEmpty().isMongoId();

      var erros = req.validationErrors();

      if(!erros){
        Arquivos.findOne({_id: req.params._idimagem, anuncio: req.params._idanuncio, usuario: req.user._id})
        .then(function (imagem) {

          if(imagem){
            fs.unlink(imagem.path, function (err) {
              if(err){
                res.sendStatus(500).end();
              }else{
                res.sendStatus(200).end();
              }
            });

          }else{
            res.sendStatus(412).end();
          }

        }).catch(function (err) {
          console.log(err);
          res.sendStatus(412).end();
        })
      }else{
        console.log(erros);
        res.sendStatus(400).end();
      }

    });

};
