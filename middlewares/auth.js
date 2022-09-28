/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');
const ServerError = require('../errors/serverError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (e) {
    if (e.name === 'JsonWebTokenError') {
      next(new AuthError('Неверный токен'));
      return;
    }
    next(new ServerError('Произошла ошибка на сервере'));
  }
  next();
};

module.exports = auth;
