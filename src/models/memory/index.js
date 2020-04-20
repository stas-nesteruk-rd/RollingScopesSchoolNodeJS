const User = require('./user.memory.model');
const Board = require('./board.memory.model');
const Task = require('./task.memory.model');

const models = {};

models.User = User;
models.Board = Board;
models.Task = Task;

module.exports = models;
