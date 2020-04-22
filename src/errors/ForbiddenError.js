const AbstractError = require('./AbstractError');
const { FORBIDDEN } = require('http-status');

class ForbiddenError extends AbstractError {
  constructor(...params) {
    super(FORBIDDEN, ...params);
  }
}

module.exports = ForbiddenError;
