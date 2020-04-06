const taskRepo = require('./../../repositories/task.memory.repository');
const Task = require('./../../models/task.model');
const uuid = require('uuid');

exports.getAll = boardId => taskRepo.getAll(boardId);

exports.getById = (boardId, taskId) => taskRepo.getById(boardId, taskId);

exports.create = data => {
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
  taskRepo.save(task);
  return task;
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
  taskRepo.update(task);
  return task;
};

exports.delete = async (boardId, taskId) => {
  const task = await this.getById(boardId, taskId);
  if (!task) {
    return undefined;
  }
  await taskRepo.delete(boardId, taskId);
  return task;
};
