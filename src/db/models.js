const mongoose = require('mongoose');
const defineUserModel = require('./models/user.model');
const defineTaskModel = require('./models/task.model');
const defineBoardModel = require('./models/board.model');

const models = {};
models.User = defineUserModel(mongoose);
models.Task = defineTaskModel(mongoose);
models.Board = defineBoardModel(mongoose);

module.exports = models;
