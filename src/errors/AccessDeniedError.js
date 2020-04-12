const AbstractError = require('./AbstractError');
const { FORBIDDEN } = require('http-status');

class AccessDeniedError extends AbstractError {
  constructor(...params) {
    super(FORBIDDEN, ...params);
  }
}

module.exports = AccessDeniedError;
