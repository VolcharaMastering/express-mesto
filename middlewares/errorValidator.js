const OK_CODE = 200;
const CODE_CREATED = 201;
const INCORRECT_DATA = 400;
const AUTH_ERROR = 401;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const errorHandler = (err, req, res, next) => {
  res.status(SERVER_ERROR).send({ message: 'Произошла ошибка на сервере'});
  next();
};
module.exports = errorHandler;
