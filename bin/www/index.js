const express = require('express');
const HTTP_STATUS = require('http-status');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const logger = require('./../../src/utils/logger/logger.utils');
const morgan = require('../../src/configs/morgan.config');
const errorHandler = require('./../../src/middleware/errorHandler');
const auth = require('./../../src/middleware/auth');
const { apiRouter } = require('./../../src/router');
const {
  sendJsonData,
  sendJsonError
} = require('./../../src/utils/response/response.utils');

const app = express();
const router = express.Router();
const swaggerDocument = YAML.load(path.join(__dirname, '../../doc/api.yaml'));

app.use(auth);
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

module.exports = app;
