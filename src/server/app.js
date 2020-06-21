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

const setupAppRoutes = process.env.NODE_ENV === 'development' ? require('./middlewares/development') : require('./middlewares/production');

console.log("setupAppRoutes", setupAppRoutes)


const app = express();


app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());

// app.use(csrf({cookie: true, maxAge: 31536000})); //31536000 => one year // max-age // one year

//TO_DO setup Rollbar configuration
app.use(express.static('public'));

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

console.log("approutes", approutes)

app.use(approutes);

setupAppRoutes(app);

app.use((err, req, res, next) => {
  let statusCode = err.statusCode ? err.statusCode : 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  let errors = err.errors ? err.errors : [];
  res.status(statusCode).json(formatResponse(statusCode, err.message ? err.message : err, [], errors)); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

module.exports = app;
