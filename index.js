//Importa o framework Express e o middleware Consign
var express = require('express');
var consign = require('consign');

//Instância do Express
var app = express();

//Injeção utilizando Consign
consign({verbose: false})
  .then('./libs/config.js')
  .then('db.js')
  .then('models')
  // .then('auth.js')
  // .then('./libs/log.js')
  .then('./libs/middlewares.js')
  .then('routes')
  .then('./libs/boot.js')
  .into(app);

module.exports = app;
