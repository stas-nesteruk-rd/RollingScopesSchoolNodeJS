const HTTP_STATUS = require('http-status');
const taskService = require('./task.service');
const boardService = require('./../boards/board.service');
const { sendJsonError } = require('./../../utils/response/response.utils');

const getTasksTreatment = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const board = await boardService.getById(boardId);
    if (!board) {
      return sendJsonError(
        res,
        {
          message: `Board don't exist by id: ${boardId}`
        },
        HTTP_STATUS.NOT_FOUND
      );
    }
    const tasks = await taskService.getAll(boardId);
    res.status(HTTP_STATUS.OK).send(tasks);
  } catch (err) {
    sendJsonError(
      res,
      { message: err.message },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getTaskTreatment = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const board = await boardService.getById(boardId);
    if (!board) {
      return sendJsonError(
        res,
        {
          message: `Board don't exist by id: ${boardId}`
        },
        HTTP_STATUS.NOT_FOUND
      );
    }
    const task = await taskService.getById(boardId, taskId);
    if (!task) {
      return sendJsonError(
        res,
        {
          message: `Task don't exist by id: ${taskId}`
        },
        HTTP_STATUS.NOT_FOUND
      );
    }
    res.status(HTTP_STATUS.OK).send(task);
  } catch (err) {
    sendJsonError(
      res,
      { message: err.message },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const createTaskTreatment = async (req, res) => {
  const keys = Object.keys(req.body);
  const requiredFields = ['title', 'order', 'description', 'userId', 'boardId'];
  const isValidOperation = requiredFields.every(key => keys.includes(key));
  if (!isValidOperation) {
    return sendJsonError(res, {
      message:
        'Wrong operation! Required field: title, order, description, userId, boardId, columnId.'
    });
  }
  try {
    const boardId = req.params.boardId;
    const board = await boardService.getById(boardId);
    if (!board) {
      return sendJsonError(
        res,
        {
          message: `Board don't exist by id: ${boardId}`
        },
        HTTP_STATUS.NOT_FOUND
      );
    }
    const data = req.body;
    data.boardId = boardId;
    const task = await taskService.create(req.body);
    res.status(HTTP_STATUS.OK).send(task);
  } catch (err) {
    sendJsonError(
      res,
      { message: err.message },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const updateTaskTreatment = async (req, res) => {
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
    return sendJsonError(res, {
      message:
        'Wrong operation! Allowed update fields: title, order, description, userId, boardId, columnId'
    });
  }
  try {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const board = await boardService.getById(boardId);
    if (!board) {
      return sendJsonError(
        res,
        {
          message: `Board don't exist by id: ${boardId}`
        },
        HTTP_STATUS.NOT_FOUND
      );
    }
    const task = await taskService.update(boardId, taskId, req.body);
    if (!task) {
      return sendJsonError(
        res,
        { message: `Task don't exist by id: ${taskId}` },
        HTTP_STATUS.NOT_FOUND
      );
    }
    res.status(HTTP_STATUS.OK).send(task);
  } catch (err) {
    sendJsonError(
      res,
      { message: err.message },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteTaskTreatment = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const taskId = req.params.taskId;
    const board = await boardService.getById(boardId);
    if (!board) {
      return sendJsonError(
        res,
        {
          message: `Board don't exist by id: ${boardId}`
        },
        HTTP_STATUS.NOT_FOUND
      );
    }
    const task = await taskService.delete(boardId, taskId);
    if (!task) {
      return sendJsonError(
        res,
        { message: `Task don't exist by id: ${taskId}` },
        HTTP_STATUS.NOT_FOUND
      );
    }
    res.status(HTTP_STATUS.OK).send(task);
  } catch (err) {
    sendJsonError(
      res,
      { message: err.message },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  getTasksTreatment,
  getTaskTreatment,
  createTaskTreatment,
  updateTaskTreatment,
  deleteTaskTreatment
};
