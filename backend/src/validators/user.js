const Joi = require('joi');

exports.userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(6)
    .required(),

});