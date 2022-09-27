/* eslint-disable linebreak-style */
const errorHandler = (err, req, res, next) => {
  res.status(err.code).send({ message: err.message });
  console.log(err.code, err.message)
  next();
};
module.exports = errorHandler;
