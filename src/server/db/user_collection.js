var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

const { User } = require("../models/User");

const createUserInMongo = data => {
  return new Promise((resolve, reject) => {
    const newUser = new User(data);
    newUser.save(err => {
      if (err) return reject(err);
      return resolve(newUser);
    });
  });
};

const getUserCount = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(User.count());
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createUserInMongo,
  getUserCount
};
