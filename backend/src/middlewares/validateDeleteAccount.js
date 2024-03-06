const validateDeleteAccount = (req, res, next) => {
  const { email } = req.body;

  if (!email) res.status(400).json({ message: 'Email is a required field' });

  return next();
};

module.exports = validateDeleteAccount;
