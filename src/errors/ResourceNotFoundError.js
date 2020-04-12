const AbstractError = require('./AbstractError');
const { NOT_FOUND } = require('http-status');

class ResourceNotFoundError extends AbstractError {
  constructor(...params) {
    super(NOT_FOUND, ...params);
  }
}

module.exports = ResourceNotFoundError;
