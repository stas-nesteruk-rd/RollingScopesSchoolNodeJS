const mongodbModels = require('./mongodb');
const memoryModels = require('./memory');
const MONGODB = 'mongodb';
const { REPOSITORY } = require('../configs/env.config');

const mode = REPOSITORY || MONGODB;

const defineModels = strategy => {
  switch (strategy) {
    case 'memory':
      return memoryModels;
    case 'mongodb':
      return mongodbModels;
    default:
      throw new Error(`The selected model isn't supported: ${strategy}`);
  }
};

module.exports = defineModels(mode);
