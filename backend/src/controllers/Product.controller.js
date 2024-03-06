const { ProductService } = require('../services');
const productHandler = require('../utils/productHandler');

const findAll = async (_req, res) => {
  const products = await ProductService.findAll();

  return res.status(200).json(products);
};

const findByAccountId = async (req, res) => {
  const { infoToken } = req.body;

  const products = await ProductService.findByAccountId(infoToken.id);

  return res.status(200).json(products);
};

const create = async (req, res) => {
  const products = req.body;
  const { infoToken } = req.body;

  if (!Array.isArray(products)) {
    const newProduct = productHandler(products);
    const {
      name, brand, model, price, color,
    } = newProduct;
    const product = await ProductService.create(name, brand, model, price, color, infoToken.id);

    return res.status(201).json(product);
  }

  const createdProducts = await Promise.all(products.map(async (item) => {
    const newProduct = productHandler(item);
    const newProductsList = [];

    await Promise.all(newProduct.map(async (i) => {
      const {
        name, brand, model, price, color,
      } = i;

      const product = await ProductService.create(name, brand, model, price, color, infoToken.id);

      newProductsList.push(product);
    }));

    return newProductsList;
  }));

  const flattenedProducts = createdProducts.flat();

  return res.status(201).json(flattenedProducts);
};

const update = async (req, res) => {
  const {
    id, name, brand, model, price, color, infoToken,
  } = req.body;

  await ProductService.update(id, name, brand, model, price, color, infoToken.id);

  return res.status(200).json({ message: 'Product has been updated!' });
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;

  await ProductService.deleteProduct(id);

  return res.status(200).json({ message: 'Product has been deleted!' });
};

module.exports = {
  findAll,
  findByAccountId,
  create,
  update,
  deleteProduct,
};
