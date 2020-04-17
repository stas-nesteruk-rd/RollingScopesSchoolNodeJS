const { Task } = require('../../db/models');
exports.getAll = async boardId => {
  return Task.find({ boardId });
};

exports.getById = async (boardId, taskId) => {
  return Task.findOne({ _id: taskId, boardId });
};

exports.save = async task => {
  return Task.create(task);
};

exports.update = async updatedTask => {
  return Task.findByIdAndUpdate(updatedTask.id, updatedTask, {
    new: true,
    runValidators: true
  });
};
exports.delete = async (boardId, id) => {
  return Task.findOneAndDelete({ _id: id, boardId });
};

exports.deleteAllTasksByBoardId = async boardId => {
  await Task.deleteMany({ boardId });
};

exports.updateUserIdOnNullbyId = async userId => {
  await Task.updateMany({ userId }, { userId: null });
};
