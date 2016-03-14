var express = require('express');
// var compression = require('compression');
var bodyParser = require('body-parser');
// var expressValidator = require('express-validator');
var helmet = require('helmet');

module.exports = function (app) {

  app.set('port', 3000);

  app.db.set('debug', true);

  app.use(helmet())
  // app.use(compression());
  app.use(bodyParser.json());
  // app.use(expressValidator(customValidators));

  app.use(express.static('./public'));
};
