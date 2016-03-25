var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');

module.exports = function (app) {

  const cfg = app.libs.config;
  const Usuarios = app.db.models.Usuarios;

  var	transporter	=	nodemailer.createTransport({
    service:	'Gmail',
    auth:	{
      user:	'appsossego@gmail.com',
      pass:	'Eq@@!VcA'
    }
  });

  app.route(cfg.urlRaizApi + '/usuarios')
    .get(function get(req, res){

        console.log(JSON.stringify(req.query));

        res.sendStatus(200).end();

      });

  app.route(cfg.urlRaizApi + '/usuarios/validaremail/:_hash')
    .get(function get(req, res){

        req.checkParams('_hash','').notEmpty();

        var erros = req.validationErrors();

        if(!erros){

            Usuarios.findOne({ chaveAcesso: req.params._hash }, function (err, usuario) {

              if(!err && usuario){
                usuario.bloqueado = false;
                usuario.save(function (err) {
                  if(!err){
                    res.sendStatus(200).end();
                  }else{
                    console.log(err);
                    res.sendStatus(412).end();
                  }
                });
              }else{
                  console.log('LOG: '+err);
                  res.sendStatus(412).end();
              }
            });

        }else{
          res.sendStatus(412).end();
        }
      });

  app.route(cfg.urlRaizApi + '/usuarios/:_id')
    .get(function get(req, res){

        res.sendStatus(200).end();

      });

  app.route(cfg.urlRaizApi + '/usuarios')
    .post(function get(req, res){

        req.checkBody('nome','').notEmpty().isName();
        req.checkBody('sobreNome','').notEmpty().isName();
        // req.checkBody('dataNascimento','').notEmpty().isNumeric();
        req.checkBody('email','').notEmpty().isEmail();
        // req.checkBody('telefone','').notEmpty().isMobilePhone();
        // req.checkBody('sobre','').notEmpty();
        req.checkBody('senha','').notEmpty().isPassword();

        var erros = req.validationErrors();

        if(!erros){

          var chaveHash = req.body.nome + req.body.email;
          var salt = bcrypt.genSaltSync();

          req.body.chaveAcesso = bcrypt.hashSync(chaveHash, salt).replace(/\//g,'x').replace(/&/g,'l');

          var usuario = new Usuarios(req.body);
          usuario = usuario.encripitarSenha(usuario);
          usuario.save(function (err) {
            if(err){
              res.sendStatus(412).end();
            }else{

              var	mailOptions	=	{
                from:	'CampuHouse	<appsossego@gmail.com>',
                to:	req.body.email,
                subject:	'Teste',
                html:	'<b>Validar Autenticação: '+ cfg.urlServe + cfg.urlRaizApi + '/usuarios/validaremail/' + usuario.chaveAcesso +'</b>'
              };

              var	sendMail	=	transporter.sendMail(mailOptions,	function(error,	info){
                  if(error){
                    console.log(error);
                  }else{
                    console.log('Email	enviado:	'	+	info.response);
                  }
              });

              res.sendStatus(200).end();
            }
          });
        }else{
          console.log(erros);
          res.sendStatus(400).end();
        }

      });


  app.route(cfg.urlRaizApi + '/usuarios')
    .all(app.auth.authenticate('usuario'))
    .put(function get(req, res){

        res.sendStatus(200).end();

      })
    .delete(function get(req, res){

        res.sendStatus(200).end();

      });

};

//
// // create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
//
// // setup e-mail data with unicode symbols
// var mailOptions = {
//     from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
//     to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world 🐴', // plaintext body
//     html: '<b>Hello world 🐴</b>' // html body
// };
//
// // send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });
