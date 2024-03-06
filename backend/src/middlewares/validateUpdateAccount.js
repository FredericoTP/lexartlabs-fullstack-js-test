const validateUpdateAccount = (req, res, next) => {
  const { password } = req.body;

  if (!password) res.status(400).json({ message: 'Password is a required field' });

  return next();
};

module.exports = validateUpdateAccount;
