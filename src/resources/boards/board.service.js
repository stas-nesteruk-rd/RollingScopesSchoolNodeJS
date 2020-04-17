const repositories = require('../../repositories');
const { boardsRepo, tasksRepo } = repositories;
const { Board } = require('../../db/models');
const uuid = require('uuid');

exports.getAll = () => boardsRepo.getAll();

exports.getById = id => boardsRepo.getById(id);

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
  return await boardsRepo.save(board);
};

exports.update = async (boardId, data) => {
  const board = await boardsRepo.getById(boardId);
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
  return boardsRepo.update(board);
};

exports.delete = async id => {
  const board = await this.getById(id);
  if (!board) {
    return undefined;
  }
  await tasksRepo.deleteAllTasksByBoardId(id);
  return await boardsRepo.delete(id);
};
