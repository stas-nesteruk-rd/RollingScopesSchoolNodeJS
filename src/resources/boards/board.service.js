const boardRepo = require('./../../repositories/board.memory.repository');
const taskRepo = require('./../../repositories/task.memory.repository');
const { Board } = require('./../../models/board.model');
const uuid = require('uuid');

exports.getAll = () => boardRepo.getAll();

exports.getById = id => boardRepo.getById(id);

exports.create = data => {
  const { title, columns } = data;
  const board = new Board({
    id: uuid(),
    title,
    columns: columns.map(column => {
      column.id = uuid();
      return column;
    })
  });
  boardRepo.save(board);
  return board;
};

exports.update = async (id, data) => {
  const board = await boardRepo.getById(id);
  if (!board) {
    return undefined;
  }
  const updateKeys = Object.keys(data);
  updateKeys.forEach(key => {
    board[key] = data[key];
  });
  boardRepo.update(board);
  return board;
};

exports.delete = async id => {
  const board = await this.getById(id);
  if (!board) {
    return undefined;
  }
  await taskRepo.deleteAllTasksByBoardId(id);
  await boardRepo.delete(id);
  return board;
};
