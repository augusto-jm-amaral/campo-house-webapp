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
          {$sort: {see: -1, data: 1}},
          // {$group:{_id: null, id: {"$addToSet": "$_id"}, nummsg: {$sum: "$see"}}},
          {$group:{_id: '$de', nummsg: {$sum: "$see"}, lastmessage: {$last: '$_id'}}},
          // {$sort: {see: 1}}
        ]
      ).exec(function (err, msgs) {

        if(!err){

          var aux = [];

          for (var i = 0; i < msgs.length; i++) {
            aux.push(msgs[i].lastmessage);
          }

          if(aux.length){

            Mensagens.find({_id: {$in: aux}})
            .populate('de', 'nome sobreNome')
            .populate({path:'anuncio', populate:{path: 'listaArquivos', model: 'Arquivos'}})
            // .populate('anuncio.listaArquivos')
            .then(function (mensagens) {

              //Melhorar depois
              var mensagens = JSON.parse(JSON.stringify(mensagens));

              for (var i = 0; i < mensagens.length; i++) {
                for (var j = 0; j < msgs.length; j++) {
                  if(('' + mensagens[i]._id) == (msgs[j].lastmessage+'')){
                    // console.log(1);
                    // console.log(mensagens[i].nummsg);
                    // console.log(msgs[i].nummsg);
                    mensagens[i].nummsg = msgs[j].nummsg;

                    // msgs[j].nummsg;
                    // console.log(mensagens);
                  }
                }
              }

              // console.log(mensagens[0].nummsg);

              res.status(200).json(mensagens).end();

            }).catch(function (err) {
              console.log(err);
              res.sendStatus(412).end();
            })

          }else{


            res.status(200).json([]).end();
          }

        }else{
          res.sendStatus(412).end();
        }
      });

    });

};
