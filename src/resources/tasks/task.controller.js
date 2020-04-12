const HTTP_STATUS = require('http-status');
const taskService = require('./task.service');
const boardService = require('./../boards/board.service');
const checkUUID = require('./../../utils/checkUUID/checkUUID.utils');
const ResourceNotFoundError = require('./../../errors/ResourceNotFoundError');
const ValidationError = require('./../../errors/ValidationError');

const getTasksTreatment = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    checkUUID(boardId);
    const board = await boardService.getById(boardId);
    if (!board) {
      throw new ResourceNotFoundError(`Board don't exist by id: ${boardId}`);
    }
    const tasks = await taskService.getAll(boardId);
    res.status(HTTP_STATUS.OK).send(tasks);
  } catch (err) {
    return next(err);
  }
};

const getTaskTreatment = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    checkUUID(boardId);
    const taskId = req.params.taskId;
    checkUUID(taskId);
    const board = await boardService.getById(boardId);
    if (!board) {
      throw new ResourceNotFoundError(`Board don't exist by id: ${boardId}`);
    }
    const task = await taskService.getById(boardId, taskId);
    if (!task) {
      throw new ResourceNotFoundError(`Task don't exist by id: ${taskId}`);
    }
    res.status(HTTP_STATUS.OK).send(task);
  } catch (err) {
    return next(err);
  }
};

const createTaskTreatment = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    checkUUID(boardId);
    const keys = Object.keys(req.body);
    const requiredFields = [
      'title',
      'order',
      'description',
      'userId',
      'boardId'
    ];
    const isValidOperation = requiredFields.every(key => keys.includes(key));
    if (!isValidOperation) {
      throw new ValidationError(
        'Wrong operation! Required field: title, order, description, userId, boardId, columnId.'
      );
    }
    const board = await boardService.getById(boardId);
    if (!board) {
      throw new ResourceNotFoundError(`Board don't exist by id: ${boardId}`);
    }
    const data = req.body;
    data.boardId = boardId;
    const task = await taskService.create(req.body);
    res.status(HTTP_STATUS.OK).send(task);
  } catch (err) {
    return next(err);
  }
};

const updateTaskTreatment = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    checkUUID(boardId);
    const taskId = req.params.taskId;
    checkUUID(taskId);
    const keys = Object.keys(req.body);
    const allowedUpdates = [
      'id',
      'title',
      'order',
      'description',
      'userId',
      'boardId',
      'columnId'
    ];
    const isValidOperation = keys.every(key => allowedUpdates.includes(key));
    if (!isValidOperation) {
      throw new ValidationError(
        'Wrong operation! Allowed update fields: title, order, description, userId, boardId, columnId'
      );
    }
    const board = await boardService.getById(boardId);
    if (!board) {
      throw new ResourceNotFoundError(`Board don't exist by id: ${boardId}`);
    }
    const task = await taskService.update(boardId, taskId, req.body);
    if (!task) {
      throw new ResourceNotFoundError(`Task don't exist by id: ${taskId}`);
    }
    res.status(HTTP_STATUS.OK).send(task);
  } catch (err) {
    return next(err);
  }
};

const deleteTaskTreatment = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    checkUUID(boardId);
    const taskId = req.params.taskId;
    checkUUID(taskId);
    const board = await boardService.getById(boardId);
    if (!board) {
      throw new ResourceNotFoundError(`Board don't exist by id: ${boardId}`);
    }
    const task = await taskService.delete(boardId, taskId);
    if (!task) {
      throw new ResourceNotFoundError(`Task don't exist by id: ${taskId}`);
    }
    res.status(HTTP_STATUS.OK).send(task);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getTasksTreatment,
  getTaskTreatment,
  createTaskTreatment,
  updateTaskTreatment,
  deleteTaskTreatment
};
