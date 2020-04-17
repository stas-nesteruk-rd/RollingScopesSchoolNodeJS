const MEMORY = 'memory';
const mongodb = require('./mongodb');
const memory = require('./memory');

const mode = process.env.REPOSITORY || MEMORY;

const repositories = strategy => {
  switch (strategy) {
    case 'memory':
      return memory;
    case 'mongodb':
      return mongodb;
    default:
      throw new Error(`The selected repository isn't supported: ${strategy}`);
  }
};

module.exports = repositories(mode);
