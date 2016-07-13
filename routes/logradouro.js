const addressValidator = require('address-validator');
const Address = addressValidator.Address;

module.exports = function (app) {

  const cfg = app.libs.config;
  const Anuncios = app.db.models.Anuncios;
  const Logradouros = app.db.models.Logradouros;

  app.route(cfg.urlRaizApi + '/anuncios/:_id/logradouros')
    .all(app.auth.authenticate('usuario'))
    .post(function (req, res) {

      req.checkParams('_id','').notEmpty().isMongoId();
      // req.checkBody('localNumero','').notEmpty().isNumeric();
      req.checkBody('localCep','').notEmpty().isNumeric();
      // req.checkBody('localBairro','').notEmpty().isName();
      req.checkBody('localCidade','').notEmpty().isName();
      req.checkBody('localEstado','').notEmpty().isName();
      req.checkBody('localPais','').notEmpty().isName();
      req.checkBody('localRua','').notEmpty();

      var erros = req.validationErrors();

      if(!erros){

        var address = new Address({
            street: req.body.localNumero + ' ' + req.body.localRua,
            city: req.body.localCidade,
            state: req.body.localEstado,
            country: req.body.localPais
        });

        addressValidator.validate(address, addressValidator.match.streetAddress, function(err, exact, inexact){

          if(!err && inexact.length){

            new Logradouros({
              localCep: inexact[0].postalCode,
              localRua: inexact[0].street,
              localNumero: inexact[0].streetNumber,
              localCidade: inexact[0].city,
              localEstado: inexact[0].state,
              localPais: inexact[0].country,
              localInfoProximidades: req.body.localInfoProximidades,
              localComplemento: req.body.localComplemento,
              dataAtualizacao: new Date(),
              usuario: req.user._id,
              anuncio: req.params._id,
              loc: {type:'Point', coordinates: [inexact[0].location.lon, inexact[0].location.lat]}
            })
            .save()
            .then(function (logradouro) {
              res.status(200).json(logradouro).end();
            })
            .catch(function (err) {
              console.log(err);
              res.sendStatus(412).end();
            });

          }else{
            res.sendStatus(404).end();
          }

        });

      }else{
        console.log(erros);
        res.sendStatus(400).end();
      }

    })
    // app.route(cfg.urlRaizApi + '/anuncios/:_idanuncio/logradouros')
    // .all(app.auth.authenticate('usuario'))
    .get(function (req, res) {
      //implementar
    })
    .put(function (req, res) {

      req.checkParams('_id','').notEmpty().isMongoId();
      // req.checkParams('_idlogradouro','').notEmpty().isMongoId();
      req.checkBody('localNumero','').notEmpty().isNumeric();
      // req.checkBody('localBairro','').notEmpty().isName();
      req.checkBody('localCidade','').notEmpty().isName();
      req.checkBody('localEstado','').notEmpty().isName();
      req.checkBody('localPais','').notEmpty().isName();
      req.checkBody('localRua','').notEmpty();

      var erros = req.validationErrors();

      if(!erros){

        var address = new Address({
            street: req.body.localNumero + ' ' + req.body.localRua,
            city: req.body.localCidade,
            state: req.body.localEstado,
            country: req.body.localPais
        });

        addressValidator.validate(address, addressValidator.match.streetAddress, function(err, exact, inexact){

          if(!err && inexact.length){

            Logradouros.update({usuario: req.user._id, anuncio: req.params._id},{
              localCep: inexact[0].postalCode,
              localRua: inexact[0].street,
              localNumero: inexact[0].streetNumber,
              localCidade: inexact[0].city,
              localEstado: inexact[0].state,
              localPais: inexact[0].country,
              localInfoProximidades: req.body.localInfoProximidades,
              dataAtualizacao: new Date(),
              usuario: req.user._id,
              anuncio: req.params._idanuncio,
              loc: {type:'Point', coordinates: [inexact[0].location.lon, inexact[0].location.lat]}
            })
            .then(function (logradouro) {
              res.status(200).json(logradouro).end();
            })
            .catch(function (err) {
              console.log(err);
              res.sendStatus(412).end();
            });

          }else{
            res.sendStatus(404).end();
          }

        });

      }else{
        console.log(erros);
        res.sendStatus(400).end();
      }
    })
    .delete(function (req, res) {

      req.checkParams('_id','').notEmpty().isMongoId();
      // req.checkParams('_idlogradouro','').notEmpty().isMongoId();

      var erros = req.validationErrors();

      if(!erros){

        Logradouros.remove({usuario: req.user._id, anuncio: req.params._id}, function (err) {
          if(!err){
            res.sendStatus(200).end();
          }else{
            console.log(err);
            res.sendStatus(404).end();
          }
        });
      }else{
        console.log(erros);
        res.sendStatus(404).end();
      }

    });

};
