const Joi = require('joi');

const customMessage = (fieldName, min, type) => ({
  'string.base': `${fieldName} should be a type of ${type}`,
  'string.empty': `${fieldName} cannot be an empty field`,
  'string.min': `${fieldName} should have a minimum length of ${min}`,
  'string.email': `${fieldName} should be valid`,
  'any.required': `${fieldName} is a required field`,
});

const idSchema = Joi.number().min(1).required().messages(customMessage('email', 1, 'string'));

const emailSchema = Joi.string().email().required().messages(customMessage('email', 3, 'string'));

const passwordSchema = Joi.string().min(6).required().messages(customMessage('password', 6, 'string'));

const nameSchema = Joi.string().min(3).required().messages(customMessage('name', 3, 'string'));

const accountSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

module.exports = {
  idSchema,
  emailSchema,
  passwordSchema,
  nameSchema,
  accountSchema,
};
