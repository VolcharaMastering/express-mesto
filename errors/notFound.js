/* eslint-disable linebreak-style */
class NotFound extends Error {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}

module.exports = NotFound;
