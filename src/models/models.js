const { mongoose } = require('../configs/mongoose.config');
const defineUserModel = require('./user.model');
const defineTaskModel = require('./task.model');
const defineBoardModel = require('./board.model');

const models = {};

models.User = defineUserModel(mongoose);
models.Task = defineTaskModel(mongoose);
models.Board = defineBoardModel(mongoose);

module.exports = models;
