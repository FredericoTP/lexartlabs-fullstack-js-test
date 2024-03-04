const validateNewAccount = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) res.status(400).json({ message: 'Email is a required field' });

  if (!email) res.status(400).json({ message: 'Email is a required field' });

  if (!password) res.status(400).json({ message: 'Password is a required field' });

  return next();
};

module.exports = validateNewAccount;
