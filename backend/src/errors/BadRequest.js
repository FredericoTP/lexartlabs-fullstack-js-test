const HttpError = require('./HttpError');

class BadRequest extends HttpError {
  constructor(message) {
    const statusCode = 400;
    super(message, statusCode);
  }
}

module.exports = BadRequest;
