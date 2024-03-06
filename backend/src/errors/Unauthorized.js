const HttpError = require('./HttpError');

class Unauthorized extends HttpError {
  constructor(message) {
    const statusCode = 401;
    super(message, statusCode);
  }
}

module.exports = Unauthorized;
