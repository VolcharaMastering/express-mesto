/* eslint-disable linebreak-style */
class ServerError extends Error {
  constructor(message) {
    super(message);
    this.code = 500;
  }
}

module.exports = ServerError;
