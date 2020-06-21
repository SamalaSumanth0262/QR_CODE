var express = require("express");
const validate = require("express-validation");
const { formatResponse } = require("../../utlis/helper");

var router = express.Router();

// API VALIDATIONS
const { authValidation } = require("../../validations");

//CONTROLLERS
const { authController } = require("../../controllers");

const { decideUserRole } = require("../../middlewares/auth");

// add n number of middlewares // can be checked for authentication // lot more abilities
const middleware = [decideUserRole];
router.post(
  "/auth/registerUser",
  validate(authValidation.registerUser),
  authController.registerUser
);

router.post(
  "/auth/login",
  validate(authValidation.loginUser),
  ...middleware,
  authController.loginUser
);

router.all("*", function(req, res, next) {
  res.status(404).json(formatResponse(404, "Invalid Request"));
});
module.exports = router;
