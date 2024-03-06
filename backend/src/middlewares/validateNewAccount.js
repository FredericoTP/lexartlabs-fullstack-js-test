const validateNewAccount = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) res.status(400).json({ message: 'name is a required field' });

  if (!email) res.status(400).json({ message: 'email is a required field' });

  if (!password) res.status(400).json({ message: 'password is a required field' });

  return next();
};

module.exports = validateNewAccount;
