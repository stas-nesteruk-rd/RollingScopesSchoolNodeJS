const mongoose = require('mongoose');
const connectionURL = process.env.MONGO_CONNECTION_STRING;

const connectToDB = cb => {
  mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('connected', () => {
    console.log(`Mongoose connected to ${connectionURL}`);
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
  mongoose,
  connectToDB
};
