const validateNewProduct = (req, res, next) => {
  const { products } = req.body;

  if (!products) res.status(400).json({ message: 'products is a required field!' });

  if (!Array.isArray(products)) {
    if (!products.details) {
      const {
        name, brand, model, price, color,
      } = products;

      if (!name || !brand || !model || !color || !price) {
        return res.status(400).json({ message: 'All fields (name, brand, model, price, color) are required!' });
      }
    } else {
      if (!products.name) {
        return res.status(400).json({ message: 'name is a required field!' });
      }
      if (!products.price) {
        return res.status(400).json({ message: 'price is a required field!' });
      }
      if (!products.details.brand || !products.details.model || !products.details.color) {
        return res.status(400).json({ message: 'All fields inside details (brand, model, color) are required!' });
      }
    }
  } else {
    if (!products.every((item) => 'name' in item)) {
      return res.status(400).json({ message: 'name is a required field in all products!' });
    }

    if (!products.every((item) => 'brand' in item)) {
      return res.status(400).json({ message: 'brand is a required field in all products!' });
    }

    if (!products.every((item) => 'model' in item)) {
      return res.status(400).json({ message: 'model is a required field in all products!' });
    }

    if (!products.every((item) => 'data' in item)) {
      return res.status(400).json({ message: 'data is a required field in all products!' });
    }

    if (!products.every((item) => 'price' in item.data && 'color' in item.data)) {
      return res.status(400).json({ message: 'All fields inside data (brand, model, color) are required!' });
    }
  }

  return next();
};

module.exports = validateNewProduct;
