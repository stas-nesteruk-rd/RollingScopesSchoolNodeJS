const path = require('path');
const checkFolder = require('./../checkFolder/checkFolder.utils');
const dateToString = require('./../date/date.utils');
const { createLogger, format, transports } = require('winston');

const LOGS_FOLDER_NAME = '/logs';
const consoleLogFormat = format.printf(log => {
  return `${dateToString()} ${log.level}: ${log.message}`;
});
checkFolder(path.join(process.cwd(), LOGS_FOLDER_NAME));

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(format.colorize(), consoleLogFormat)
    }),
    new transports.File({
      filename: path.join(process.cwd(), `${LOGS_FOLDER_NAME}/error.log`),
      level: 'error',
      format: format.combine(format.uncolorize(), format.prettyPrint()),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new transports.File({
      filename: path.join(process.cwd(), `${LOGS_FOLDER_NAME}/info.log`),
      level: 'info',
      format: format.combine(format.uncolorize(), format.prettyPrint()),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

module.exports = logger;
