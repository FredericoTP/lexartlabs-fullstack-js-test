const validateDeleteProduct = (req, res, next) => {
  const { id } = req.body;

  if (!id) res.status(400).json({ message: 'id is a required field' });

  return next();
};

module.exports = validateDeleteProduct;
