const boardsRepo = require('./board.db.repository');
const usersRepo = require('./user.db.repository');
const tasksRepo = require('./task.db.repository');
const connectToRepository = require('./../../configs/mongoose.config');

module.exports = {
  connectToRepository,
  boardsRepo,
  usersRepo,
  tasksRepo
};
