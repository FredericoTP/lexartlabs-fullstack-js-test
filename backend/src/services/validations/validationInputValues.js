const {
  idSchema,
  emailSchema,
  passwordSchema,
  accountSchema,
  nameSchema,
  productSchema,
  accountIdSchema,
} = require('./schemas');
const { BadRequest } = require('../../errors');

const validateEmail = (email) => {
  const { error } = emailSchema.validate(email);

  if (error) throw new BadRequest(error.message);
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);

  if (error) throw new BadRequest(error.message);
};

const validatePassword = (password) => {
  const { error } = passwordSchema.validate(password);

  if (error) throw new BadRequest(error.message);
};

const validateAccount = (name, email, password) => {
  const { error } = accountSchema.validate({ name, email, password });

  if (error) throw new BadRequest(error.message);
};

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) throw new BadRequest(error.message);
};

const validateProduct = (name, brand, model, price, color) => {
  const { error } = productSchema.validate({
    name, brand, model, price, color,
  });

  if (error) throw new BadRequest(error.message);
};

const validateAccountId = (accountId) => {
  const { error } = accountIdSchema.validate(accountId);

  if (error) throw new BadRequest(error.message);
};

module.exports = {
  validateEmail,
  validatePassword,
  validateAccount,
  validateName,
  validateId,
  validateProduct,
  validateAccountId,
};
