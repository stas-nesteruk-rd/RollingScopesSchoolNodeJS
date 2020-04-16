const { Board } = require('./../db/models');
exports.getAll = async () => {
  return Board.find({});
};

exports.getById = async id => {
  return Board.findOne({ _id: id });
};

exports.save = async board => {
  return Board.create(board);
};

exports.update = async updatedBoard => {
  const updated = await Board.findByIdAndUpdate(
    updatedBoard._id,
    updatedBoard,
    {
      new: true,
      runValidators: true
    }
  );
  return updated;
};

exports.delete = async id => {
  return Board.findByIdAndDelete(id);
};
