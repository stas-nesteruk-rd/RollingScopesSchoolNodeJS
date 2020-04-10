const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line  no-unused-vars
morgan.token('params', (req, res) => {
  if (Object.keys(req.params).length === 0) {
    return 'Params: empty';
  }
  return `Params: ${JSON.stringify(req.params)}`;
});

// eslint-disable-next-line  no-unused-vars
morgan.token('query', (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return 'Query: empty';
  }
  return `Query: ${JSON.stringify(req.query)}`;
});

// eslint-disable-next-line  no-unused-vars
morgan.token('body', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return 'Body: empty';
  }
  if (Object.keys(req.body).includes('password')) {
    delete req.body.password;
  }
  return `Body: ${JSON.stringify(req.body)}`;
});

const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), '/logs/access.log'),
  { flags: 'a' }
);

module.exports = {
  loggingConsole: morgan(
    ':method; :url; :params; :query; :body; :status - :response-time ms'
  ),
  loggingFile: morgan(
    ':date :method; :url; :params; :query; :body; :status - :response-time ms',
    { stream: accessLogStream }
  )
};
