const { ERROR_MESSAGES } = require("./../constants");

class AppError extends Error {
  constructor(
    statusCode = 500,
    message = ERROR_MESSAGES.COMMON_ERROR_MESSAGE,
    err = null
  ) {
    // in most cases err will not be passed
    super();

    if (err && err.stack) Error.captureStackTrace(err.stack);
    else Error.captureStackTrace(this, this.constructor);

    this.name = err && err.name ? err.name : this.constructor.name;

    this.message = err && err.message ? err.message : message;

    this.code = err && err.code ? err.code : null;

    this.statusCode = statusCode;
  }
}
module.exports = AppError;
