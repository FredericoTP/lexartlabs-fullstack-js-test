const Joi = require('joi');

const customMessage = (fieldName, min, type) => ({
  'string.base': `${fieldName} should be a type of ${type}`,
  'string.empty': `${fieldName} cannot be an empty field`,
  'string.min': `${fieldName} should have a minimum length of ${min}`,
  'string.email': `${fieldName} should be valid`,
  'any.required': `${fieldName} is a required field`,
});

const emailSchema = Joi.string().email().required().messages(customMessage('email', 3, 'string'));

module.exports = {
  emailSchema,
};
