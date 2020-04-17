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

  const columnsToResponse = columns => {
    return columns.map(column => {
      const { id, title, order } = column;
      return { id, title, order };
    });
  };

  boardSchema.statics.toResponse = board => {
    const { id, title } = board;
    const columns =
      board.columns.length > 0 ? columnsToResponse(board.columns) : [];
    return { id, title, columns };
  };

  const Board = mongoose.model('Board', boardSchema);
  return Board;
};

module.exports = defineBoardModel;
