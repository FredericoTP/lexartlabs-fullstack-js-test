const validateDeleteProduct = (req, res, next) => {
  const { id } = req.params;

  if (!id) res.status(400).json({ message: 'id is a required field' });

  if (Number.isNaN(id)) res.status(400).json({ message: 'id must be a number' });

  return next();
};

module.exports = validateDeleteProduct;
