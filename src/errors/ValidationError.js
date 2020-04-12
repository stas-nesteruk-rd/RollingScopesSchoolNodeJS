const AbstractError = require('./AbstractError');
const { BAD_REQUEST } = require('http-status');

class ValidationError extends AbstractError {
  constructor(...params) {
    super(BAD_REQUEST, ...params);
  }
}

module.exports = ValidationError;
