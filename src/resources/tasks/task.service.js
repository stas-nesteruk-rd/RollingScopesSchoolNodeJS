const repositories = require('../../repositories');
const { tasksRepo } = repositories;
const { Task } = require('../../models');
const uuid = require('uuid');

exports.getAll = boardId => tasksRepo.getAll(boardId);

exports.getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

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
  return await tasksRepo.save(task);
};

exports.update = async (boardId, taskId, data) => {
  const task = await this.getById(boardId, taskId);
  if (!task) {
    return undefined;
  }
  if (data.id) {
    delete data.id;
  }
  const updatedKeys = Object.keys(data);
  updatedKeys.forEach(key => {
    task[key] = data[key];
  });
  return await tasksRepo.update(task);
};

exports.delete = async (boardId, taskId) => {
  const task = await this.getById(boardId, taskId);
  if (!task) {
    return undefined;
  }
  return await tasksRepo.delete(boardId, taskId);
};
