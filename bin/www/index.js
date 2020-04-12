const express = require('express');
const HTTP_STATUS = require('http-status');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const logger = require('./../../src/utils/logger/logger.utils');
const dateToString = require('./../../src/utils/date/date.utils');
const morgan = require('../../src/configs/morgan.config');
const errorHandler = require('./../../src/middleware/errorHandler');
const { apiRouter } = require('./../../src/router');
const {
  sendJsonData,
  sendJsonError
} = require('./../../src/utils/response/response.utils');

const UNCAUGHT_EXCEPTION = 'uncaughtException';
const UNHANDLED_REJECTION = 'unhandledRejection';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../../doc/api.yaml'));

const router = express.Router();

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(morgan);

router.get('/', (req, res) => {
  sendJsonData(res, { message: 'Greetings to you!' }, HTTP_STATUS.OK);
});

router.get('*', (req, res) => {
  logger.error(`Wrong url: ${req.url}`);
  sendJsonError(res, { message: 'Ups, something went wrong..' });
});

app.use(apiRouter);
app.use(router);

app.use(errorHandler);

process
  .on('uncaughtException', error => {
    logger.error({
      date: dateToString(),
      type: UNCAUGHT_EXCEPTION,
      message: error.message,
      stack: error.stack
    });
    // eslint-disable-next-line  no-process-exit
    process.exit(1);
  })
  .on('unhandledRejection', error => {
    logger.error({
      date: dateToString(),
      type: UNHANDLED_REJECTION,
      message: error.message,
      stack: error.stack
    });
  });

module.exports = app;
