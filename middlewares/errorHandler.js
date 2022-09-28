/* eslint-disable linebreak-style */
const errorHandler = (err, req, res, next) => {
  res.status(err.code).send({ message: err.message });
  next();
};
module.exports = errorHandler;
