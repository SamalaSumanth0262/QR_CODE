/* eslint-disable no-console */
//admin uploads company pic

var {upload} = require('../services/s3');

const uploadFields = (fields) => {
  let fieldsArray = [];
  fields.forEach((field) =>
    fieldsArray.push({
      name: field,
      maxCount: 1
    })
  );
  return upload.fields(fieldsArray);
};

const processRequest = (req, res, next, err) => {
  if (err) {
    console.log('TCL: processRequest -> err', err);
    next(err);
  } else {
    // special workaround for files validating with express-validator
    req.body.files = req.files;
    next();
  }
};

