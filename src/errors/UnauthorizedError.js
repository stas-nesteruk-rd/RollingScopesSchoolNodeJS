const AbstractError = require('./AbstractError');
const { UNAUTHORIZED } = require('http-status');

class UnauthorizedError extends AbstractError {
  constructor(...params) {
    super(UNAUTHORIZED, ...params);
  }
}

module.exports = UnauthorizedError;
