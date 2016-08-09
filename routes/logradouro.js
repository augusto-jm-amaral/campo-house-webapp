const addressValidator = require('address-validator');
const Address = addressValidator.Address;
addressValidator.setOptions({language: 'PT-br'});

module.exports = function (app) {

  const cfg = app.libs.config;
  const Anuncios = app.db.models.Anuncios;
  const Logradouros = app.db.models.Logradouros;

  app.route(cfg.urlRaizApi + '/anuncios/:_id/logradouros')
    .all(app.auth.authenticate('usuario'))
    .post(function (req, res) {

      req.checkParams('_id','').notEmpty().isMongoId();
      // req.checkBody('localNumero','').notEmpty().isNumeric();
      // req.checkBody('localCep','').notEmpty().isNumeric();
      // req.checkBody('localBairro','').notEmpty().isName();
      // req.checkBody('localCidade','').notEmpty().isName();
      // req.checkBody('localEstado','').notEmpty().isName();
      // req.checkBody('localPais','').notEmpty().isName();
      // req.checkBody('localRua','').notEmpty();
      req.checkBody('endereco','').notEmpty();
      req.checkBody('exibir','').notEmpty();
      req.checkBody('lat','').notEmpty();
      req.checkBody('lng','').notEmpty();

      var erros = req.validationErrors();

      if(!erros){

        // var address = new Address({
        //     street: req.body.localNumero + ' ' + req.body.localRua,
        //     city: req.body.localCidade,
        //     state: req.body.localEstado,
        //     country: req.body.localPais
        // });

        // console.log(req.body.endereco);

        addressValidator.validate(req.body.endereco, addressValidator.match.unknown, function(err, exact, inexact){

          if(!err && inexact.length){

            // console.log(inexact);
            new Logradouros({
              endereco: req.body.endereco,
              // localCep: inexact[0].postalCode,
              // localRua: inexact[0].street,
              // localNumero: inexact[0].streetNumber,
              localCidade: inexact[0].city,
              localEstado: inexact[0].state,
              localPais: inexact[0].country,
              // localInfoProximidades: req.body.localInfoProximidades,
              localComplemento: (req.body.complemento ? req.body.complemento : ''),
              dataAtualizacao: new Date(),
              usuario: req.user._id,
              anuncio: req.params._id,
              exibir: req.body.exibir,
              // loc: {type:'Point', coordinates: [inexact[0].location.lon, inexact[0].location.lat]}
              loc: {type:'Point', coordinates: [req.body.lng, req.body.lat]}
            })
            .save()
            .then(function (logradouro) {
              res.status(200).json({
                _id: logradouro._id,
                endereco: logradouro.endereco,
                complemento: logradouro.localComplemento,
                lat: logradouro.loc.coordinates[1],
                lng: logradouro.loc.coordinates[0],
                exibir: logradouro.exibir
              }).end();
            })
            .catch(function (err) {
              console.log(err);
              res.sendStatus(412).end();
            });

          }else{
            console.log(err);
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

      req.checkParams('_id','').notEmpty().isMongoId();

      var erros = req.validationErrors();

      if(!erros){

        // console.log(req.params._id);

        Logradouros.findOne({anuncio: req.params._id})
          .then(function (logradouro) {

            console.log(logradouro);
            if(logradouro){
              res.status(200).json({
                _id: logradouro._id,
                endereco: logradouro.endereco,
                complemento: logradouro.localComplemento,
                lat: logradouro.loc.coordinates[1],
                lng: logradouro.loc.coordinates[0],
                exibir: logradouro.exibir
              }).end();
            }else{
              // res.sendStatus(404).end();
              // console.log('aki');
              res.status(200).json({exibir: true});
            }
          }).catch(function (err) {
            console.log(1);
            console.log(err);
            res.sendStatus(412).end();
          });

      }else{
        console.log(erros);
        res.sendStatus(400).end();
      }

    })
    .put(function (req, res) {

      // req.checkParams('_id','').notEmpty().isMongoId();
      // req.checkParams('_idlogradouro','').notEmpty().isMongoId();
      // req.checkBody('localNumero','').notEmpty().isNumeric();
      // req.checkBody('localBairro','').notEmpty().isName();
      // req.checkBody('localCidade','').notEmpty().isName();
      // req.checkBody('localEstado','').notEmpty().isName();
      // req.checkBody('localPais','').notEmpty().isName();
      // req.checkBody('localRua','').notEmpty();
      req.checkParams('_id','').notEmpty().isMongoId();
      // req.checkBody('localNumero','').notEmpty().isNumeric();
      // req.checkBody('localCep','').notEmpty().isNumeric();
      // req.checkBody('localBairro','').notEmpty().isName();
      // req.checkBody('localCidade','').notEmpty().isName();
      // req.checkBody('localEstado','').notEmpty().isName();
      // req.checkBody('localPais','').notEmpty().isName();
      // req.checkBody('localRua','').notEmpty();
      req.checkBody('endereco','').notEmpty();
      req.checkBody('lat','').notEmpty();
      req.checkBody('lng','').notEmpty();
      req.checkBody('exibir','').notEmpty();

      var erros = req.validationErrors();

      if(!erros){

        // var address = new Address({
        //     street: req.body.localNumero + ' ' + req.body.localRua,
        //     city: req.body.localCidade,
        //     state: req.body.localEstado,
        //     country: req.body.localPais
        // });

        addressValidator.validate(req.body.endereco, addressValidator.match.unknown, function(err, exact, inexact){

          if(!err && inexact.length){

            Logradouros.update({usuario: req.user._id, anuncio: req.params._id},{
              endereco: req.body.endereco,
              // localCep: inexact[0].postalCode,
              // localRua: inexact[0].street,
              // localNumero: inexact[0].streetNumber,
              localCidade: inexact[0].city,
              localEstado: inexact[0].state,
              localPais: inexact[0].country,
              // localInfoProximidades: req.body.localInfoProximidades,
              dataAtualizacao: new Date(),
              localComplemento: (req.body.complemento ? req.body.complemento : ''),
              // usuario: req.user._id,
              // anuncio: req.params._id,
              loc: {type:'Point', coordinates: [req.body.lng, req.body.lat]}
            })
            .then(function (n) {
              // console.log(logradouro);

              Logradouros.findOne({anuncio: req.params._id})
                .then(function (logradouro) {

                  // console.log(logradouro);
                  if(logradouro){
                    res.status(200).json({
                      _id: logradouro._id,
                      endereco: logradouro.endereco,
                      complemento: logradouro.localComplemento,
                      lat: logradouro.loc.coordinates[1],
                      lng: logradouro.loc.coordinates[0],
                      exibir: logradouro.exibir
                    }).end();
                  }else{
                    // res.sendStatus(404).end();
                    // console.log('aki');
                    res.status(200).json({exibir: true});
                  }
                }).catch(function (err) {
                  console.log(1);
                  console.log(err);
                  res.sendStatus(412).end();
                });
            })
            .catch(function (err) {
              console.log(err);
              res.sendStatus(412).end();
            });

          }else{
            console.log(erros);
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
