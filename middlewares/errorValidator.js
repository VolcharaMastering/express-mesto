const {
  OK_CODE, CODE_CREATED, INCORRECT_DATA, NOT_FOUND, SERVER_ERROR, AUTH_ERROR, PERMISSION_ERROR,
} = require('../states/states');

const errorHandler = (err, req, res, next) => {
  res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
  next();
};
module.exports = errorHandler;
