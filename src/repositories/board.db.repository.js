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
  return Board.findByIdAndUpdate(updatedBoard._id, updatedBoard, {
    new: true,
    runValidators: true
  });
};

exports.delete = async id => {
  return Board.findByIdAndDelete(id);
};
