const mongoose = require('mongoose');
const setupDataBase = require('../../db/loadData');
const connectionURL = process.env.MONGO_CONNECTION_STRING;
const logger = require('../utils/logger/logger.utils');

const connectToRepository = cb => {
  mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('connected', async () => {
    logger.info(`Mongoose connected to ${connectionURL}`);
    await setupDataBase();
    cb();
  })
    .on('error', error => {
      logger.error(`Mongoose connection error: ${error}`);
    })
    .on('disconnected', () => {
      logger.info('Mongoose disconected');
    });
};

module.exports = connectToRepository;
