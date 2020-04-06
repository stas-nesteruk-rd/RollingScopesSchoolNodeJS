const express = require('express');
const HTTP_STATUS = require('http-status');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
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

router.get('/', (req, res) => {
  sendJsonData(res, { message: 'Greetings to you!' }, HTTP_STATUS.OK);
});

router.get('*', (req, res) => {
  sendJsonError(res, { message: 'Ups, something went wrong..' });
});

app.use(apiRouter);
app.use(router);

module.exports = {
  app
};
