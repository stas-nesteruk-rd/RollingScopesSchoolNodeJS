const uuid = require('uuid');

const defineBoardModel = mongoose => {
  const columnSchema = new mongoose.Schema({
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
    }
  });

  const boardSchema = new mongoose.Schema({
    _id: {
      type: String,
      default: uuid
    },
    title: {
      type: String,
      trim: true,
      default: 'No title'
    },
    columns: [columnSchema]
  });

  const Board = mongoose.model('Board', boardSchema);
  return Board;
};

module.exports = defineBoardModel;
