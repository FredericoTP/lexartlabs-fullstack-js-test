const { emailSchema } = require('./schemas');
const { BadRequest } = require('../../errors');

const validateEmail = (email) => {
  const { error } = emailSchema.validate(email);

  if (error) throw new BadRequest(error.message);
};

module.exports = {
  validateEmail,
};
