require('./../src/configs/env.config');
const { connectToDB } = require('./../src/configs/mongoose.config');
// require('./../src/configs/mongoose.config');
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
    // eslint-disable-next-line  no-process-exit
    process.exit(1);
  })
  .on('unhandledRejection', error => {
    logger.error({
      date: dateToString(),
      type: UNHANDLED_REJECTION,
      message: `${UNHANDLED_REJECTION}: ${error.message}`,
      stack: error.stack
    });
  });

const port = process.env.PORT || 4000;

connectToDB(() => {
  app.listen(port, () => {
    console.log(`Application running on http://localhost:${port}`);
  });
});
