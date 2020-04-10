const morgan = require('morgan');
const logger = require('../utils/logger/logger.utils');
const dateToString = require('./../utils/date/date.utils');
const PARAMS_TITLE = 'Params: ';
const QUERY_TITLE = 'Query: ';
const BODY_TITLE = 'Body: ';
const EMPTY = 'empty';

const convertJSONtoString = (title, data) => {
  let result = title;
  for (const [key, value] of Object.entries(data)) {
    result = result.concat(key, ' - ', value, ', ');
  }
  return result.substring(0, result.length - 2);
};

// eslint-disable-next-line  no-unused-vars
morgan.token('params', (req, res) => {
  if (Object.keys(req.params).length === 0) {
    return PARAMS_TITLE + EMPTY;
  }
  return convertJSONtoString(PARAMS_TITLE, req.params);
});

// eslint-disable-next-line  no-unused-vars
morgan.token('query', (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return QUERY_TITLE + EMPTY;
  }
  return convertJSONtoString(QUERY_TITLE, req.query);
});

// eslint-disable-next-line  no-unused-vars
morgan.token('body', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return BODY_TITLE + EMPTY;
  }
  if (Object.keys(req.body).includes('password')) {
    delete req.body.password;
  }
  return convertJSONtoString(BODY_TITLE, req.body);
});

module.exports = morgan((tokens, req, res) => {
  const info = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.params(req, res),
    tokens.query(req, res),
    tokens.body(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res)
  ].join('; ');
  logger.info(`${dateToString()}: ${info} ms`);
});
