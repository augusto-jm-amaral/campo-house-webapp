const nodemailer = require('nodemailer');

module.exports = function (app) {

  const cfg = app.libs.config;
  const Planos = app.db.models.Planos;
  const ContratoPlanos = app.db.models.ContratoPlanos;

  var transporter = nodemailer.createTransport({
      host: 'smtp.mail.pawnmail.com',
      port: 587,
      // secure: false,
      tls: {
          rejectUnauthorized: false
      },
      auth: {
          user: 'campohouse@campohouse.com.br',
          pass: 'campohouse1'
      }
  });

  app.route(cfg.urlRaizApi + '/planos/:_numplano')
    .all(app.auth.authenticate('usuario'))
    .get(function get(req, res){

          req.checkParams('_numplano','').notEmpty().isNumeric();

          var erros = req.validationErrors();

          if(!erros){

            Planos.findOne({ordem: req.params._numplano})
              .then(function (plano) {

                new ContratoPlanos({
                  plano: plano._id,
                  usuario: req.user._id
                })
                .save(function (err, contratoPlano) {

                  var textoPlan = '<h2>Plano Contratado</h2><br>';
                  textoPlan += '<b>Plano: '+ plano.nome +'</b><br>';
                  textoPlan += '<b>Usuario: '+ req.user.nome +'</b><br>';
                  textoPlan += '<b>ID Usuario: '+ req.user._id +'</b><br>';
                  textoPlan += '<b>Telefone: '+ req.user.telefone +'</b><br>';
                  textoPlan += '<b>ID Contrato: '+ contratoPlano._id +'</b><br>';

                  if(!err){

                    var mailOptions = {
                        from: 'CampuHouse	<campohouse@campohouse.com.br>',
                        to: 'campohouse@campohouse.com.br',
                        subject: 'Contratação de Plano',
                        html: textoPlan
                    };

                    var sendMail = transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log('CONTRATA PLANO ::: ' +  error + ' ::: ' + textoPlan);
                        } else {
                            console.log('Email	enviado:	' + info.response);
                        }
                    });

                    //Mandar E-mail pro usuario

                    //Adicionar Plano já?

                    res.sendStatus(200).end();

                  }else{
                    console.log(err);
                    res.sendStatus(412).end();
                  }
                });

              })
              .catch(function (err) {
                console.log(err);
                res.sendStatus(412).end();
              });

          }else{
            console.log(erros);
            res.sendStatus(400).end();
          }

    });

};
