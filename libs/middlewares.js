var express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    expressValidator = require('express-validator'),
    customValidators = require('./validators.js')()
    morgan = require('morgan'),
    path = require('path'),
    FileStreamRotator = require('file-stream-rotator'),
    logger = require("../libs/logger");

module.exports = function(app) {

  // var logDirectory = path.join(__dirname, 'log')
  // var logDirectory = '/www/logs';

  // ensure log directory exists
  // fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

  // create a rotating write stream
  // var accessLogStream = FileStreamRotator.getStream({
  //   date_format: 'YYYYMMDD',
  //   filename: path.join(logDirectory, 'access-%DATE%.log'),
  //   frequency: 'daily',
  //   verbose: false
  // });

  // setup the logger
  app.use(morgan('combined', {stream: logger.stream}))

    app.set('port', 3000);

    app.db.set('debug', true);

    app.use(helmet())
    app.use(compression());
    app.use(bodyParser.json());
    app.use(expressValidator(customValidators));

    app.use(express.static('./public'));
};
