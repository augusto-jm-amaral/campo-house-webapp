// import passport from 'passport';
// import {Strategy} from 'passport-jwt'
// import {ExtractJwt} from 'passport-jwt'

var passport = require('passport');
var passportJwt = require('passport-jwt');

module.exports = function (app) {

  var Usuarios = app.db.models.Usuarios;
  var cfg = app.libs.config;
  var Strategy = passportJwt.Strategy;

  var opts = {};

  opts.secretOrKey = cfg.jwtSecret;
  opts.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeader();

  passport.use('usuario',new Strategy(opts, function(playload, done){

      var promise = Usuarios.findById(playload._id);
      promise.then(function (usuario) {
        // if(usuario && !usuario.bloqueado){
        if(usuario){
          return done(null, usuario);
        }
        return done(null, false);
      }).catch(function (err) {
        return done(null, false);
      });
  }));

  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function(permissao){
      return passport.authenticate(permissao, cfg.jwtSession);
    }
  };

};
