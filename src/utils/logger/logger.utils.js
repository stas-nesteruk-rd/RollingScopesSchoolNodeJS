const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const LOGS_FOLDER_NAME = '/logs';

const isLogsFolderExist = () => {
  // eslint-disable-next-line no-sync
  if (!fs.existsSync(path.join(process.cwd(), LOGS_FOLDER_NAME))) {
    // eslint-disable-next-line no-sync
    fs.mkdirSync(path.join(process.cwd(), LOGS_FOLDER_NAME));
  }
};

isLogsFolderExist();

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), `${LOGS_FOLDER_NAME}/error.log`),
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: path.join(process.cwd(), `${LOGS_FOLDER_NAME}/info.log`),
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

module.exports = {
  logger
};
