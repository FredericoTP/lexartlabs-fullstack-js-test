const validateUpdateAccount = (req, res, next) => {
  const { password, id } = req.body;

  if (!password) res.status(400).json({ message: 'Password is a required field' });

  if (!id) res.status(400).json({ message: 'id is a required field' });

  return next();
};

module.exports = validateUpdateAccount;
