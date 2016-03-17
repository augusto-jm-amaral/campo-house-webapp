module.exports = function (app) {

  const cfg = app.libs.config;
  const Anuncios = app.db.models.Anuncios;

  app.route(cfg.urlRaizApi + '/anuncios')
    .get(function get(req, res){

        console.log(JSON.stringify(req.query));

        res.sendStatus(200).end();

      });

  app.route(cfg.urlRaizApi + '/anuncios/:_id')
    .get(function get(req, res){

        res.sendStatus(200).end();

      });

  app.route(cfg.urlRaizApi + '/anuncios')
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
