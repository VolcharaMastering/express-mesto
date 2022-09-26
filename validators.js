const { celebrate, Joi } = require('celebrate');

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(6).alphanum(),
    name: Joi.string().min(6).max(30),
    avatar: Joi.string().min(6),
    about: Joi.string().min(6).max(30),
  }),
});
module.exports = { validateUserCreate };
