const taskRepo = require('./../../repositories/task.db.repository');
const { Task } = require('../../db/models');
const uuid = require('uuid');

exports.getAll = boardId => taskRepo.getAll(boardId);

exports.getById = (boardId, taskId) => taskRepo.getById(boardId, taskId);

exports.create = async data => {
  const { title, order, description, userId, boardId, columnId } = data;
  const task = new Task({
    id: uuid(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  return await taskRepo.save(task);
};

exports.update = async (boardId, taskId, data) => {
  const task = await this.getById(boardId, taskId);
  if (!task) {
    return undefined;
  }
  const updatedKeys = Object.keys(data);
  updatedKeys.forEach(key => {
    task[key] = data[key];
  });
  return await taskRepo.update(task);
};

exports.delete = async (boardId, taskId) => {
  const task = await this.getById(boardId, taskId);
  if (!task) {
    return undefined;
  }
  return await taskRepo.delete(boardId, taskId);
};
