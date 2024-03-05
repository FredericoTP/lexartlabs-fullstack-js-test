const { Product } = require('../database/models');
const { validateProduct, validateId, validateAccountId } = require('./validations/validationInputValues');
const { findById } = require('./Account.service');
const { Conflict, BadRequest } = require('../errors');

const findAll = async () => {
  const products = await Product.findAll();

  return products;
};

const findProductById = async (id) => {
  validateId(id);

  const product = await Product.findOne({
    where: { id },
  });

  return product;
};

const findByAccountId = async (accountId) => {
  validateAccountId(accountId);

  const products = await Product.findAll({
    where: { accountId },
  });

  return products;
};

const create = async (name, brand, model, price, color, accountId) => {
  validateProduct(name, brand, model, price, color, accountId);

  const checkAccount = await findById(accountId);

  if (!checkAccount) throw new BadRequest('Account not found!');

  const product = await Product.create({
    name, brand, model, price, color, accountId,
  });

  return product;
};

const update = async (id, productInfo) => {
  validateId(id);
  validateProduct(...productInfo);

  const {
    name, brand, model, price, color,
  } = productInfo;

  const checkProduct = await findProductById(id);

  if (!checkProduct) throw new Conflict('Product does not exist!');

  await Product.update(
    {
      name, brand, model, price, color,
    },
    { where: { id } },
  );
};

const deleteProduct = async (id) => {
  validateId(id);

  const checkProduct = await findProductById(id);

  if (!checkProduct) throw new Conflict('Product does not exist!');

  await Product.destroy({
    where: { id },
  });
};

module.exports = {
  findAll,
  findByAccountId,
  create,
  update,
  deleteProduct,
};
