/* eslint-disable */
const uuid = require('uuid');
const checkUUID = require('../utils/checkUUID/checkUUID.utils');

const defineTaskModel = mongoose => {
  const schema = new mongoose.Schema({
    _id: {
      type: String,
      default: uuid
    },
    title: {
      type: String,
      trim: true,
      default: 'No title'
    },
    order: {
      type: Number
    },
    description: {
      type: String,
      trim: true,
      default: 'No description'
    },
    userId: {
      type: String,
      default: null,
      validate(value) {
        if (value !== null) {
          checkUUID(value);
        }
      }
    },
    boardId: {
      type: String,
      default: null,
      validate(value) {
        if (value !== null) {
          checkUUID(value);
        }
      }
    },
    columnId: {
      type: String,
      default: null,
      validate(value) {
        if (value !== null) {
          checkUUID(value);
        }
      }
    }
  });

  schema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.boardId;
    delete userObject.columnId;
    return userObject;
  };

  const Task = mongoose.model('Task', schema);
  return Task;
};

module.exports = defineTaskModel;
