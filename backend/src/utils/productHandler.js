const productHandler = (newProduct) => {
  if (newProduct.details) {
    const {
      name, details, price,
    } = newProduct;
    const { brand, model, color } = details;

    return {
      name, brand, model, price, color,
    };
  }

  if (newProduct.data) {
    const {
      name, brand, model, data,
    } = newProduct;

    const products = [];

    data.forEach((item) => {
      const { price, color } = item;
      products.push({
        name, brand, model, price, color,
      });
    });

    return { products };
  }

  return newProduct;
};

module.exports = productHandler;
