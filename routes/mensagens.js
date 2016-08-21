const nodemailer = require('nodemailer');

module.exports = function (app) {

  const cfg = app.libs.config;
  const Anuncios = app.db.models.Anuncios;
  const Mensagens = app.db.models.Mensagens;
  const Usuarios = app.db.models.Usuarios;

  var	transporter	=	nodemailer.createTransport({
    host:	'smtp.mail.pawnmail.com',
    port: 587,
    // secure: false,
    tls: {
      rejectUnauthorized:false
    },
    auth:	{
      user:	'campohouse@campohouse.com.br',
      pass:	'campohouse1'
    }
  });

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
              }).save(function (err) {

                Usuarios.findOne({_id: anuncio.usuario})
                  .then(function (usuario) {

                    if(usuario){

                      console.log(usuario.email);

                      var	mailOptions	=	{
                        from:	'CampuHouse	<campohouse@campohouse.com.br>',
                        to:	usuario.email,
                        subject:	'Teste Mensagem',
                        html:	'<b>Você tem uma mensagem</b>'
                      };

                      var	sendMail	=	transporter.sendMail(mailOptions,	function(error,	info){
                        if(error){
                          console.log(error);
                        }else{
                          console.log('Email	enviado:	'	+	info.response);
                        }
                      });
                    }else{
                      res.sendStatus(200).end();
                    }

                  }).catch(function (err) {
                    console.log(err);
                    res.sendStatus(412).end();
                  })

              });

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

    });

    app.route(cfg.urlRaizApi + '/mensagens')
    .all(app.auth.authenticate('usuario'))
    .get(function (req, res) {

      Mensagens.aggregate(
        [
          {$match: {para: req.user._id}},
          {$group:{_id: null, id: {"$addToSet": "$_id"}, nummsg: {$sum: "$see"}}},
          {$sort: {see: 1}}
        ]
      ).exec(function (err, msgs) {

        if(!err){
          res.status(200).json(msgs).end();
        }else{
          res.sendStatus(412).end();
        }
      });

    });

};
