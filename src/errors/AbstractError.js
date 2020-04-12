class AbstractError extends Error {
  constructor(status, ...params) {
    super(...params);
    this.status = status;
  }
}

module.exports = AbstractError;
