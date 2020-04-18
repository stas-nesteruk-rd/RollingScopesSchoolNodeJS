const boardsRepo = require('./board.mongodb.repository');
const usersRepo = require('./user.mongodb.repository');
const tasksRepo = require('./task.mongodb.repository');
const connectToRepository = require('./../../configs/mongoose.config');

module.exports = {
  connectToRepository,
  boardsRepo,
  usersRepo,
  tasksRepo
};
