var config = require('config');
//app configs
const HTTP_PORT = process.env.HTTP_PORT || config.get('app.port');

// mongoDBurl defines here..
const MONGODB_URL = process.env.MONGODB_URL || config.get('mongo_db_url');

const NODE_ENV = 'DEV'; //TO_DO : Hard Coded..

module.exports = {
  MONGODB_URL,
  HTTP_PORT
};
