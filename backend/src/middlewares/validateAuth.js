const { validateToken } = require('../authentication/auth');
const { Unauthorized } = require('../errors');

const validateAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new Unauthorized('Token not found!');

    const infoToken = validateToken(authorization);

    req.body.infoToken = infoToken;

    next();
  } catch (error) {
    throw new Unauthorized('Token must be valid');
  }

  return '';
};

module.exports = validateAuth;
