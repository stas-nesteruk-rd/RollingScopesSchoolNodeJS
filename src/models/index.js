const mongodbModels = require('./mongodb');
const memoryModels = require('./memory');
const MEMORY = 'memory';

const mode = process.env.REPOSITORY || MEMORY;

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
