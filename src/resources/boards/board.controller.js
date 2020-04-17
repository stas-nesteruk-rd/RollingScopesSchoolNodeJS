const HTTP_STATUS = require('http-status');
const boardService = require('./board.service');
const checkUUID = require('./../../utils/checkUUID/checkUUID.utils');
const ValidationError = require('./../../errors/ValidationError');
const ResourceNotFoundError = require('./../../errors/ResourceNotFoundError');
const { Board } = require('../../models');

const getBoardsTreatment = async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    res.status(HTTP_STATUS.OK).send(boards.map(Board.toResponse));
  } catch (err) {
    return next(err);
  }
};

const getBoardTreatment = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    checkUUID(boardId);
    const board = await boardService.getById(boardId);
    if (!board) {
      throw new ResourceNotFoundError(`Board don't exist by id: ${boardId}`);
    }
    res.status(HTTP_STATUS.OK).send(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
};

const createBoardTreatment = async (req, res, next) => {
  try {
    const boardKeys = Object.keys(req.body);
    const requiredBoardFiels = ['title', 'columns'];
    const requiredColumnFiels = ['title', 'order'];
    let isValidOperation = requiredBoardFiels.every(key =>
      boardKeys.includes(key)
    );
    if (!isValidOperation) {
      throw new ValidationError('Wrong operation! Send: title, columns');
    }
    const columnKeys = req.body.columns.map(column => Object.keys(column));
    isValidOperation = columnKeys.map(keys =>
      requiredColumnFiels.every(key => keys.includes(key))
    );
    if (isValidOperation.some(value => value === false)) {
      throw new ValidationError(
        'Wrong operation! Columns should includ only: title, order'
      );
    }
    const board = await boardService.create(req.body);
    res.status(HTTP_STATUS.OK).send(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
};

const updateBoardTreatment = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    checkUUID(boardId);
    const keys = Object.keys(req.body);
    const allowedBoardUpdates = ['id', 'title', 'columns'];
    const allowedColumnUpdates = ['id', 'title', 'order'];
    let isValidOperation = keys.every(key => allowedBoardUpdates.includes(key));
    if (!isValidOperation) {
      throw new ValidationError(
        'Wrong operation! Allowed update fields: tittle, columns'
      );
    }
    if (keys.some(key => key === 'columns')) {
      const columnKeys = req.body.columns.map(column => Object.keys(column));
      isValidOperation = columnKeys.map(ckeys =>
        ckeys.every(key => allowedColumnUpdates.includes(key))
      );
      if (isValidOperation.some(value => value === false)) {
        throw new ValidationError(
          'Wrong operation! Columns should includ only: title, order'
        );
      }
    }
    const board = await boardService.update(boardId, req.body);
    if (!board) {
      throw new ResourceNotFoundError(`Board don't exist by id: ${boardId}`);
    }
    res.status(HTTP_STATUS.OK).send(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
};

const deleteBoardTreatment = async (req, res, next) => {
  try {
    const boardId = req.params.boardId;
    checkUUID(boardId);
    const board = await boardService.delete(boardId);
    if (!board) {
      throw new ResourceNotFoundError(`Board don't exist by id: ${boardId}`);
    }
    res.status(HTTP_STATUS.OK).send(Board.toResponse(board));
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getBoardsTreatment,
  getBoardTreatment,
  createBoardTreatment,
  updateBoardTreatment,
  deleteBoardTreatment
};
