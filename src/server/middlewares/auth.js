const { formatResponse } = require("../utlis/helper");
const { getUserCount } = require("../db/user_collection");
const decideUserRole = async (req, res, next) => {
  try {
    var count = await getUserCount();
    //checking the first user and assigning the role
    count === 0 ? (req.body["role"] = "admin") : (req.body["role"] = "normal");
    next();
  } catch (err) {
    return res.status(400).json(formatResponse(400, err));
  }
};

module.exports = {
  decideUserRole
};
