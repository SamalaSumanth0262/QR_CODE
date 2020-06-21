const http = require('http');
const logger = require('./logger');
const {HTTP_PORT} = require('./keys');
const app = require('./app');
require('./db');

http.createServer(app).listen(HTTP_PORT, () => {
  logger.info(`HTTP server is now running on PORT: ${HTTP_PORT}`);
});

module.exports = app;
