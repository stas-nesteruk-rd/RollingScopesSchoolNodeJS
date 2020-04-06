const HTTP_STATUS = require('http-status');

const sendJsonError = (res, error, status = HTTP_STATUS.BAD_REQUEST) => {
  res.status(status).json({
    success: false,
    error
  });
};

const sendJsonData = (res, data = {}, status = HTTP_STATUS.OK) => {
  res.status(status).json(
    Object.assign(
      {
        success: true
      },
      data
    )
  );
};

module.exports = {
  sendJsonData,
  sendJsonError
};
