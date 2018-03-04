const joi = require('joi');

const userSchema = joi.object().keys({
  name: joi.string().alphanum().required(),
  email: joi.string().email().required(),
  phone: joi.string().regex(/^(\+?91|0)?[6789]\d{9}$/).required(),
  address: joi.string().required(),
});

module.exports = {
  validate: obj => joi.validate(obj, userSchema),
};
