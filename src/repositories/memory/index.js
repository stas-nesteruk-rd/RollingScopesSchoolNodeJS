const boardsRepo = require('./board.memory.repository');
const usersRepo = require('./user.memory.repository');
const tasksRepo = require('./task.memory.repository');
const logger = require('../../utils/logger/logger.utils');

const connectToRepository = cb => {
  logger.info('Memory mode is on');
  cb();
};

module.exports = {
  connectToRepository,
  boardsRepo,
  usersRepo,
  tasksRepo
};
