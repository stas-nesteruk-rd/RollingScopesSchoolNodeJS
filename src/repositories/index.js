const MONGODB = 'mongodb';
const mongodbRepository = require('./mongodb');
const memoryRepository = require('./memory');

const mode = process.env.REPOSITORY || MONGODB;

const defineRepositories = strategy => {
  switch (strategy) {
    case 'memory':
      return memoryRepository;
    case 'mongodb':
      return mongodbRepository;
    default:
      throw new Error(`The selected repository isn't supported: ${strategy}`);
  }
};

module.exports = defineRepositories(mode);
