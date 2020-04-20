require('./../src/configs/env.config');
const { connectToRepository } = require('./repositories');
const logger = require('./../src/utils/logger/logger.utils');
const dateToString = require('./../src/utils/date/date.utils');
const app = require('./../bin/www/index');

const UNCAUGHT_EXCEPTION = 'uncaughtException';
const UNHANDLED_REJECTION = 'unhandledRejection';

process
  .on('uncaughtException', error => {
    logger.error({
      date: dateToString(),
      type: UNCAUGHT_EXCEPTION,
      message: `${UNCAUGHT_EXCEPTION}: ${error.message}`,
      stack: error.stack
    });
    process.exit = 1;
  })
  .on('unhandledRejection', error => {
    logger.error({
      date: dateToString(),
      type: UNHANDLED_REJECTION,
      message: `${UNHANDLED_REJECTION}: ${error.message}`,
      stack: error.stack
    });
    process.exit = 1;
  });

const port = process.env.PORT || 4000;

connectToRepository(() => {
  app.listen(port, () => {
    logger.info(`Application running on http://localhost:${port}`);
  });
});
