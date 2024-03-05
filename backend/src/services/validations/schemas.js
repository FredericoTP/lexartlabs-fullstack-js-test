const Joi = require('joi');

const customMessage = (fieldName, min, type) => ({
  'string.base': `${fieldName} should be a type of ${type}`,
  'string.empty': `${fieldName} cannot be an empty field`,
  'string.min': `${fieldName} should have a minimum length of ${min}`,
  'string.email': `${fieldName} should be valid`,
  'any.required': `${fieldName} is a required field`,
});

const idSchema = Joi.number().min(1).required().messages(customMessage('id', 1, 'number'));

const emailSchema = Joi.string().email().required().messages(customMessage('email', 3, 'string'));

const passwordSchema = Joi.string().min(6).required().messages(customMessage('password', 6, 'string'));

const nameSchema = Joi.string().min(3).required().messages(customMessage('name', 3, 'string'));

const accountSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const brandSchema = Joi.string().required().messages(customMessage('brand', 1, 'string'));

const modelSchema = Joi.string().required().messages(customMessage('model', 1, 'string'));

const priceSchema = Joi.number().min(0).required().messages(customMessage('price', 0, 'number'));

const colorSchema = Joi.string().required().messages(customMessage('color', 1, 'string'));

const accountIdSchema = Joi.number().min(1).required().messages(customMessage('accountId', 1, 'number'));

const productSchema = Joi.object({
  name: nameSchema,
  brand: brandSchema,
  model: modelSchema,
  price: priceSchema,
  color: colorSchema,
  accountId: accountIdSchema,
});

module.exports = {
  idSchema,
  emailSchema,
  passwordSchema,
  nameSchema,
  accountSchema,
  productSchema,
  accountIdSchema,
};
