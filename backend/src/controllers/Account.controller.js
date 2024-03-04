const { AccountService } = require('../services');

const findAll = async (req, res) => {
  const accounts = await AccountService.findAll();

  return res.status(200).json(accounts);
};

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const account = await AccountService.create(name, email, password);

  return res.status(201).json(account);
};

const update = async (req, res) => {
  const { password, id } = req.body;

  await AccountService.updatePassword(password, id);

  return res.status(200).json({ message: 'Account has been updated!' });
};

const deleteAccount = async (req, res) => {
  const { email } = req.body;

  await AccountService.deleteAccount(email);

  return res.status(204).json({ message: 'Account has been deleted!' });
};

module.exports = {
  findAll,
  create,
  update,
  deleteAccount,
};
