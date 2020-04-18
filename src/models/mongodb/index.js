const mongoose = require('mongoose');
const defineUserModel = require('./user.mongodb.model');
const defineTaskModel = require('./task.mongodb.model');
const defineBoardModel = require('./board.mongodb.model');

const models = {};

models.User = defineUserModel(mongoose);
models.Task = defineTaskModel(mongoose);
models.Board = defineBoardModel(mongoose);

module.exports = models;
