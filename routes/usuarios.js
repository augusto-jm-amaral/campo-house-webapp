module.exports = function (app) {

  const cfg = app.libs.config;
  const Usuarios = app.db.models.Usuarios;

  app.route(cfg.urlRaizApi + '/usuarios')
    .get(function get(req, res){

        console.log(JSON.stringify(req.query));

        res.sendStatus(200).end();

      });

  app.route(cfg.urlRaizApi + '/usuarios/:_id')
    .get(function get(req, res){

        res.sendStatus(200).end();

      });

  app.route(cfg.urlRaizApi + '/usuarios')
    .all(app.auth.authenticate('usuario'))
    .post(function get(req, res){

        res.sendStatus(200).end();

      })
    .put(function get(req, res){

        res.sendStatus(200).end();

      })
    .delete(function get(req, res){

        res.sendStatus(200).end();

      });

};
