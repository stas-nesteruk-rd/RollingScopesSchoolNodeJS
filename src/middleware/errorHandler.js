const HTTP_STATUS = require('http-status');
const logger = require('./../utils/logger/logger.utils');
const dateToString = require('./../utils/date/date.utils');
const AbstractError = require('./../errors/AbstractError');
const { sendJsonError } = require('./../utils/response/response.utils');

// eslint-disable-next-line  no-unused-vars
const errorHandler = (error, req, res, next) => {
  console.log(error);
  logger.error({
    date: dateToString(),
    message: error.message,
    stack: error.stack
  });
  if (error instanceof AbstractError) {
    return sendJsonError(res, { message: error.message }, error.status);
  }
  sendJsonError(
    res,
    { message: error.message },
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
};

module.exports = errorHandler;
