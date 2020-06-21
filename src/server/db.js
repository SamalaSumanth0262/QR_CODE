var mongoose = require('mongoose');
/**
 * For MongoDB Connection
 */
var {MONGODB_URL} = require('./keys');
mongoose.Promise = global.Promise;
mongoose
  .connect(MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB Connection has been established successfully.');
  }) // eslint-disable-line
  .catch((err) => console.error('Unable to connect to the database:', err));
