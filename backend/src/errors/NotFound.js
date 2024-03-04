const HttpError = require('./HttpError');

class NotFound extends HttpError {
  constructor(message) {
    const statusCode = 404;
    super(message, statusCode);
  }
}

module.exports = NotFound;
