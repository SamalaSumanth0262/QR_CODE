var express = require('express');
const validate = require('express-validation');
const {formatResponse} = require('../../utlis/helper');
var multer = require('multer');

var router = express.Router();

// API VALIDATIONS
const {authValidation} = require('../../validations');

//CONTROLLERS
const {authController} = require('../../controllers');

const {decideUserRole} = require('../../middlewares/auth');

// add n number of middlewares // can be checked for authentication // lot more abilities
const middleware = [decideUserRole];

router.post('/auth/registerUser', validate(authValidation.registerUser), authController.registerUser);

router.post('/auth/login', validate(authValidation.loginUser), ...middleware, authController.loginUser);

var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb) {
    // console.log(file);
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]
    );
  }
});

var uploadSingle = multer({
  //multer settings
  storage: storage
}).single('file');

router.post('/upload', (req, res) => {
  uploadSingle(req, res, function(err) {
    if (err) {
      res.json({err});
      return;
    }
    res.json(req.file);
  });
});

module.exports = router;
