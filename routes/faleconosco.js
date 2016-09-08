var nodemailer = require('nodemailer');

module.exports = function(app) {

    const FaleConosco = app.db.models.FaleConosco;
    const cfg = app.libs.config;

    var transporter = nodemailer.createTransport({
        host: 'smtp.mail.pawnmail.com',
        port: 587,
        // secure: false,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: 'contato@campohouse.com.br',
            pass: 'contato1'
        }
    });

    app.route(cfg.urlRaizApi + '/faleconosco')
        .post(function get(req, res) {

            // console.log(req.body);

            req.checkBody('nome', '').notEmpty();
            req.checkBody('email', '').notEmpty();
            req.checkBody('telefone', '').notEmpty();
            req.checkBody('mensagem', '').notEmpty();

            var erros = req.validationErrors();

            if (!erros) {

              new FaleConosco(req.body)
                .save()
                .then(function (faleconosco) {

                  var mailOptions = {
                      from: 'CampuHouse - Fale Conosco	<contato@campohouse.com.br>',
                      to: 'contato@campohouse.com.br',
                      subject: 'Mensagem de ' + faleconosco.nome,
                      html: '<b>Nome:</b> '+ faleconosco.nome +'<br><b>E-mail:</b> ' + faleconosco.email + '<br><b>Telefone: </b>' + faleconosco.telefone + '<br><b>Mensagem:</b>' + faleconosco.mensagem
                  };

                  var sendMail = transporter.sendMail(mailOptions, function(error, info) {
                      if (error) {
                          console.log(error);
                      } else {
                          console.log('Email	enviado:	' + info.response);
                      }
                  });

                  res.sendStatus(200);

                })
                .catch(function (err) {
                  console.log(err);
                  res.sendStatus(412);
                });

            } else {
              console.log(erros);
              res.sendStatus(400);
            }


        });

};
