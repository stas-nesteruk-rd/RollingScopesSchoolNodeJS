const repositories = require('../../repositories');
const { boardsRepo, tasksRepo } = repositories;
const { Board } = require('../../models');

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

const titleSort = (first, second) => {
  if (first.title > second.title) return 1;
  if (first.title < second.title) return -1;
  return 0;
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
    const allowedColumnUpdates = ['title', 'order'];
    board.columns.sort(titleSort);
    data.columns.sort(titleSort);
    for (let i = 0; i < board.columns.length; i++) {
      allowedColumnUpdates.forEach(key => {
        board.columns[i][key] = data.columns[i][key];
      });
    }
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
