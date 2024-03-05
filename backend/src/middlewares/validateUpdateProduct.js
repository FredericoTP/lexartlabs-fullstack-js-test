const validateUpdateProduct = (req, res, next) => {
  const {
    id, name, brand, model, price, color,
  } = req.body;

  if (!id) res.status(400).json({ message: 'id is a required field' });

  if (!name) res.status(400).json({ message: 'name is a required field' });

  if (!brand) res.status(400).json({ message: 'brand is a required field' });

  if (!model) res.status(400).json({ message: 'model is a required field' });

  if (!price) res.status(400).json({ message: 'price is a required field' });

  if (!color) res.status(400).json({ message: 'color is a required field' });

  return next();
};

module.exports = validateUpdateProduct;
