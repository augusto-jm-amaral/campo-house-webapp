module.exports = function (app) {

  const cfg = app.libs.config;
  const Usuarios = app.db.models.Usuarios;

  app.route(cfg.urlRaizApi + '/login')
    .post(function get(req, res){

          req.checkBody('email').notEmpty();
          req.checkBody('senha').notEmpty();

          var erros = req.validationErrors();

          if(!erros){

            var email = req.body.email;
            var senha = req.body.senha;

            var query = Usuarios.findOne({email: email});
            query.then(function (usuario) {
              if(usuario){
                  if(usuario.validarSenha(usuario.senha, senha)){
                      const playload = {_id: usuario._id};
                      res.json({
                        token: jwt.encode(playload, cfg.jwtSecret)
                      });
                  }else{
                    res.sendStatus(400).end();
                  }
                }else{
                  res.sendStatus(400).end();
                }
            }).catch(function (err) {
              res.sendStatus(400).end();
            });

          }else{
            res.sendStatus(400).end();
          }
      });
};
