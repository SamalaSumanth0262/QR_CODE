/* eslint-disable no-console */
const isEmpty = require("../utlis/isEmpty");
var slugify = require("slugify");
const formatResponse = (status = 500, err = "", data = [], errors = []) => {
  return {
    status,
    statusText: "TO_DO",
    message: err && err.message ? err.message : err,
    data,
    errors
  };
};

module.exports = {
  formatResponse
};
