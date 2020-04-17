const MEMORY = 'memory';
const mongodbRepository = require('./mongodb');
const memoryRepository = require('./memory');

const mode = process.env.REPOSITORY || MEMORY;

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
