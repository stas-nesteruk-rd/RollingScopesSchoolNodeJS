const boardRepo = require('./../../repositories/board.db.repository');
const taskRepo = require('./../../repositories/task.db.repository');
const { Board } = require('../../db/models');
const uuid = require('uuid');

exports.getAll = () => boardRepo.getAll();

exports.getById = id => boardRepo.getById(id);

exports.create = async data => {
  const { title, columns } = data;
  const board = new Board({
    id: uuid(),
    title,
    columns: columns.map(column => {
      column.id = uuid();
      return column;
    })
  });
  return await boardRepo.save(board);
};

exports.update = async (boardId, data) => {
  const board = await boardRepo.getById(boardId);
  if (!board) {
    return undefined;
  }
  if (data.title) {
    board.title = data.title;
  }
  if (data.columns) {
    board.columns = data.columns.map(column => {
      const { id, title, order } = column;
      return { _id: id, title, order };
    });
  }
  return boardRepo.update(board);
};

exports.delete = async id => {
  const board = await this.getById(id);
  if (!board) {
    return undefined;
  }
  await taskRepo.deleteAllTasksByBoardId(id);
  return await boardRepo.delete(id);
};
