var multer = require('multer');


module.exports = function (app) {


  const cfg = app.libs.config;
  const Anuncios = app.db.models.Anuncios;

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/imgprodutos');
    },
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
  });

  var upload = multer({ storage: storage }).single('file');

  app.route(cfg.urlRaizApi + '/anuncios/imagens')
    .all(app.auth.authenticate('usuario'))
    .post(function get(req, res){

      res.sendStatus(200).end();

    });

  app.route(cfg.urlRaizApi + '/anuncios')
    .get(function get(req, res){

        console.log(JSON.stringify(req.query));

        res.sendStatus(200).end();

      });

  app.route(cfg.urlRaizApi + '/anuncios/:_id')
    .get(function get(req, res){

        res.sendStatus(200).end();

      });

  app.route(cfg.urlRaizApi + '/anuncios')
    // .all(app.auth.authenticate('usuario'))
    .post(function get(req, res){

        req.checkBody('sobreTitulo','').notEmpty();
        req.checkBody('sobreDescricao','').notEmpty();

        var erros = req.validationErrors();

        if(!erros){

          var anuncio = new Anuncios(req.body);
          anuncio.save(function (err, anuncio) {
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

        res.sendStatus(200).end();

      })
    .delete(function get(req, res){

        res.sendStatus(200).end();

      });

};
