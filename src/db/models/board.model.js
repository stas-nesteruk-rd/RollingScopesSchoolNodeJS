const uuid = require('uuid');

const defineBoardModel = mongoose => {
  const columnSchema = new mongoose.Schema(
    {
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
    },
    {
      timestamps: false,
      versionKey: false
    }
  );

  const boardSchema = new mongoose.Schema(
    {
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
    },
    {
      timestamps: false,
      versionKey: false
    }
  );

  const Board = mongoose.model('Board', boardSchema);
  return Board;
};

module.exports = defineBoardModel;
