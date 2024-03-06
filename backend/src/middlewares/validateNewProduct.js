const validateNewProduct = (req, res, next) => {
  const products = req.body;

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
    const arrayProducts = [...products];

    if (!arrayProducts.every((item) => 'name' in item)) {
      return res.status(400).json({ message: 'name is a required field in all products!' });
    }

    if (!arrayProducts.every((item) => 'brand' in item)) {
      return res.status(400).json({ message: 'brand is a required field in all products!' });
    }

    if (!arrayProducts.every((item) => 'model' in item)) {
      return res.status(400).json({ message: 'model is a required field in all products!' });
    }

    if (!arrayProducts.every((item) => 'data' in item)) {
      return res.status(400).json({ message: 'data is a required field in all products!' });
    }

    if (!arrayProducts.every((item) => item.data.every((i) => 'price' in i && 'color' in i))) {
      return res.status(400).json({ message: 'All fields inside data (price, color) are required!' });
    }
  }

  return next();
};

module.exports = validateNewProduct;
