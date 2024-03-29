const bcrypt = require('bcryptjs');
const { Account } = require('../database/models');
const { generateToken } = require('../authentication/auth');
const { validateEmail, validatePassword } = require('./validations/validationInputValues');
const { Unauthorized } = require('../errors');

const login = async (email, password) => {
  validateEmail(email);
  validatePassword(password);

  const account = await Account.findOne({
    where: { email },
  });

  if (!account) throw new Unauthorized('Invalid email or password');

  const isValidPassword = bcrypt.compareSync(password, account.dataValues.password);

  if (!isValidPassword) throw new Unauthorized('Invalid email or password');

  const token = generateToken({
    id: account.id,
    name: account.name,
    email: account.email,
  });

  return token;
};

module.exports = {
  login,
};
