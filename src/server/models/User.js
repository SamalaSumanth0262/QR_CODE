const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: String,
    role: { type: String }
  },
  {
    timestamps: true,
    collection: "users"
  }
);

var User = mongoose.model("User", userSchema);

module.exports = {
  User,
  userSchema
};
