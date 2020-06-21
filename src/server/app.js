const logger = require('./logger');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
const express = require('express');
var expressMonitor = require('express-status-monitor');
const cors = require('cors');
const approutes = require('./routes/approutes');
const {formatResponse} = require('../server/utlis/helper');
const {ERROR_MESSAGES, CSRF_ERROR_CODE} = require('./constants');
var methodOverride = require('method-override');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var connect = require('connect');
const serveIndex = require('serve-index');

var morgan = require('morgan'); // log requests to the console (express4)

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function onUnhandledError(err) {
  try {
    logger.error(err);
  } catch (e) {
    console.log('LOGGER ERROR:', e); //eslint-disable-line no-console
    console.log('APPLICATION ERROR:', err); //eslint-disable-line no-console
  }
  process.exit(1);
}

process.on('unhandledRejection', onUnhandledError);
process.on('uncaughtException', onUnhandledError);

const setupAppRoutes =
  process.env.NODE_ENV === 'development' ? require('./middlewares/development') : require('./middlewares/production');

const app = express();

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());

// app.use(csrf({cookie: true, maxAge: 31536000})); //31536000 => one year // max-age // one year

//TO_DO setup Rollbar configuration
app.use(expressMonitor(require('./status.config')));

app.set('env', process.env.NODE_ENV);

logger.info(`Application env: ${process.env.NODE_ENV}`);

app.use(logger.expressMiddleware);

const corsOptions = {
  origin: '*',
  methods: '',
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.disable('x-powered-by');

app.use(bodyParser.json());

app.use(approutes);

app.use(function(req, res, next) {
  //allow cross origin requests
  if (req.method === 'OPTIONS') {
    console.log('!OPTIONS');
    var headers = {};
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Credentials'] = false;
    headers['Access-Control-Max-Age'] = '86400'; // 24 hours
    headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
    res.writeHead(200, headers);
    res.end();
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
  res.header('Access-Control-Max-Age', '3600');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  );
  next();
});

app.use(express.static(__dirname + '/public/uploads'));
// app.use(express.static('public'));
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use('/ftp', express.static('public'), serveIndex('public', {icons: true}));
app.use((err, req, res, next) => {
  let statusCode = err.statusCode ? err.statusCode : 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  let errors = err.errors ? err.errors : [];
  res.status(statusCode).json(formatResponse(statusCode, err.message ? err.message : err, [], errors)); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

setupAppRoutes(app);
module.exports = app;
