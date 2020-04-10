const express = require('express');
const HTTP_STATUS = require('http-status');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const {
  loggingConsole,
  loggingFile
} = require('./../../src/common/morgan.config');
const { logger } = require('./../../src/utils/logger/logger.utils');
const { apiRouter } = require('./../../src/router');
const {
  sendJsonData,
  sendJsonError
} = require('./../../src/utils/response/response.utils');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../../doc/api.yaml'));

const router = express.Router();

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(loggingConsole);
app.use(loggingFile);

process.on('uncaughtException', error => {
  logger.error(
    `${new Date().toString()} - uncaughtException: ${error.message}; Stack: ${
      error.stack
    }`
  );
  // eslint-disable-next-line  no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', error => {
  logger.error(
    `${new Date().toString()} - unhandledRejection: ${error.message}; Stack: ${
      error.stack
    }`
  );
});

router.get('/', (req, res) => {
  sendJsonData(res, { message: 'Greetings to you!' }, HTTP_STATUS.OK);
});

router.get('*', (req, res) => {
  logger.error(`Wrong url: ${req.url}`);
  sendJsonError(res, { message: 'Ups, something went wrong..' });
});

app.use(apiRouter);
app.use(router);

module.exports = {
  app
};
