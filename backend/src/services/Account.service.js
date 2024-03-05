const bcrypt = require('bcryptjs');
const { Account } = require('../database/models');
const {
  validateEmail, validateAccount, validatePassword, validateId,
} = require('./validations/validationInputValues');
const { Conflict, BadRequest } = require('../errors');

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

const findAll = async () => {
  const accounts = await Account.findAll();

  return accounts;
};

const findById = async (id) => {
  validateId(id);

  const account = await Account.findOne({
    where: { id },
  });

  return account;
};

const findByEmail = async (email) => {
  validateEmail(email);

  const account = await Account.findOne({
    where: { email },
  });

  return account;
};

const create = async (name, email, password) => {
  validateAccount(name, email, password);

  const checkAccount = await findByEmail(email);

  if (checkAccount) throw new Conflict('Account already exists!');

  const hash = bcrypt.hashSync(password, SALT_ROUND);

  const account = await Account.create({ name, email, password: hash });

  return account;
};

const updatePassword = async (password, id) => {
  validatePassword(password);

  const checkAccount = await findById(id);

  if (!checkAccount) throw new BadRequest('Account not found!');

  const hash = bcrypt.hashSync(password, SALT_ROUND);

  await Account.update(
    { password: hash },
    { where: { id } },
  );
};

const deleteAccount = async (email) => {
  validateEmail(email);

  const checkAccount = await findByEmail(email);

  if (!checkAccount) throw new BadRequest('Account not found!');

  await Account.destroy({
    where: { email },
  });
};

module.exports = {
  findAll,
  findByEmail,
  create,
  updatePassword,
  deleteAccount,
  findById,
};
