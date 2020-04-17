const User = require('./user.model');
const Board = require('./board.model');
const Task = require('./task.model');

const models = {};

models.User = User;
models.Board = Board;
models.Task = Task;

module.exports = models;
