const { createUserInMongo, loginUserMongo } = require("../db/user_collection");
const { formatResponse } = require("../utlis/helper");

const registerUser = async (req, res, next) => {
  try {
    var { email, password, phone_number, name } = req.body;
    const user = await createUserInMongo({
      name,
      email,
      phone_number,
      password
    });
    return res.status(200).json(formatResponse(200, null, user, null));
  } catch (err) {
    console.log("TCL: registerUser -> err", err);
    //always log error.
    return res.status(400).json(formatResponse(400, err));
  }
};

const loginUser = async (req, res, next) => {
  try {
    var { email, password } = req.body;
    var result = await loginUserMongo({
      email,
      password
    });
    return res.status(200).json(formatResponse(200, null, result, null));
  } catch (err) {
    console.log("loginUser -> err", err);
    return res.status(400).json(formatResponse(400, err));
  }
};

module.exports = {
  registerUser,
  loginUser
};
