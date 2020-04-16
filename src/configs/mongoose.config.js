const mongoose = require('mongoose');
const setupDataBase = require('./../db/loadData/loadData');
const connectionURL = process.env.MONGO_CONNECTION_STRING;

const connectToDB = cb => {
  mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('connected', async () => {
    console.log(`Mongoose connected to ${connectionURL}`);
    await setupDataBase();
    cb();
  });

  db.on('error', error => {
    console.log(`Mongoose connection error: ${error}`);
  });

  db.on('disconnected', () => {
    console.log('Mongoose disconected');
  });
};

module.exports = {
  connectToDB
};
