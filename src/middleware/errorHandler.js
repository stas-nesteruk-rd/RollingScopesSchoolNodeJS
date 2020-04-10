const HTTP_STATUS = require('http-status');
const logger = require('./../utils/logger/logger.utils');
const dateToString = require('./../utils/date/date.utils');
const { sendJsonError } = require('./../utils/response/response.utils');

// eslint-disable-next-line  no-unused-vars
const internalServerErrorHandler = (error, req, res, next) => {
  logger.error(
    `${dateToString()} - Exception: ${error.message}; Stack: ${error.stack}`
  );
  sendJsonError(
    res,
    { message: error.message },
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
};

module.exports = internalServerErrorHandler;
