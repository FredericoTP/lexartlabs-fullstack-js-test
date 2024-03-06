const HttpError = require('./HttpError');

class Conflict extends HttpError {
  constructor(message) {
    const statusCode = 409;
    super(message, statusCode);
  }
}

module.exports = Conflict;
