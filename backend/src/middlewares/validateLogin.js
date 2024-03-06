const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) res.status(400).json({ message: 'Email is a required field' });

  if (!password) res.status(400).json({ message: 'Password is a required field' });

  return next();
};

module.exports = validateLogin;
