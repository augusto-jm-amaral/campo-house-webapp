const addressValidator = require('address-validator');
const Address = addressValidator.Address;

module.exports = function (app) {

  const cfg = app.libs.config;
  const Anuncios = app.db.models.Anuncios;
  const Mensagens = app.db.models.Mensagens;

  app.route(cfg.urlRaizApi + '/anuncios/:_id/mensagem')
    .all(app.auth.authenticate('usuario'))
    .post(function (req, res) {

      req.checkParams('_id','').notEmpty().isMongoId();
      req.checkBody('texto','').notEmpty();

      var erros = req.validationErrors();

      if(!erros){

        Anuncios.findOne({_id: req.params._id}, function(err, anuncio){
          if(err){
            res.sendStatus(412).end();
          }else{
            if(anuncio){
              new Mensagens({
                texto: req.body.texto,
                de: req.user._id,
                para: anuncio.usuario,
                anuncio: anuncio._id
              }).save(function (err) {});

              res.sendStatus(200).end();
            }else{
              res.sendStatus(404).end();
            }
          }
        });

      }else{
        console.log(erros);
        res.sendStatus(400).end();
      }

    })
    .get(function (req, res) {
      //implementar
    });

};
