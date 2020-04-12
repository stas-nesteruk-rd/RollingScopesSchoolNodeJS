const ValidationError = require('./../../errors/ValidationError');
const validator = require('validator');

const checkUUID = uuid => {
  if (!validator.isUUID(uuid)) {
    throw new ValidationError(`Wrong id number: ${uuid}`);
  }
};

module.exports = checkUUID;
