const HTTP_STATUS = require('http-status');
const boardService = require('./board.service');
const { sendJsonError } = require('./../../utils/response/response.utils');

const getBoardsTreatment = async (req, res) => {
  try {
    const boards = await boardService.getAll();
    res.status(HTTP_STATUS.OK).send(boards);
  } catch (err) {
    sendJsonError(
      res,
      { message: err.message },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const getBoardTreatment = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const board = await boardService.getById(boardId);
    if (!board) {
      return sendJsonError(
        res,
        { message: `Board don't exist by id: ${boardId}` },
        HTTP_STATUS.NOT_FOUND
      );
    }
    res.status(HTTP_STATUS.OK).send(board);
  } catch (err) {
    sendJsonError(
      res,
      { message: err.message },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const createBoardTreatment = async (req, res) => {
  const boardKeys = Object.keys(req.body);
  const requiredBoardFiels = ['title', 'columns'];
  const requiredColumnFiels = ['title', 'order'];
  let isValidOperation = requiredBoardFiels.every(key =>
    boardKeys.includes(key)
  );
  if (!isValidOperation) {
    return sendJsonError(res, {
      message: 'Wrong operation! Send: title, columns'
    });
  }
  const columnKeys = req.body.columns.map(column => Object.keys(column));
  isValidOperation = columnKeys.map(keys =>
    requiredColumnFiels.every(key => keys.includes(key))
  );
  if (isValidOperation.some(value => value === false)) {
    return sendJsonError(res, {
      message: 'Wrong operation! Columns should includ only: title, order'
    });
  }
  try {
    const board = await boardService.create(req.body);
    res.status(HTTP_STATUS.OK).send(board);
  } catch (err) {
    sendJsonError(
      res,
      { message: err.message },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const updateBoardTreatment = async (req, res) => {
  const boardId = req.params.boardId;
  const keys = Object.keys(req.body);
  const allowedBoardUpdates = ['id', 'title', 'columns'];
  const allowedColumnUpdates = ['id', 'title', 'order'];
  let isValidOperation = keys.every(key => allowedBoardUpdates.includes(key));
  if (!isValidOperation) {
    return sendJsonError(res, {
      message: 'Wrong operation! Allowed update fields: tittle, columns'
    });
  }
  if (keys.some(key => key === 'columns')) {
    const columnKeys = req.body.columns.map(column => Object.keys(column));
    isValidOperation = columnKeys.map(ckeys =>
      ckeys.every(key => allowedColumnUpdates.includes(key))
    );
    if (isValidOperation.some(value => value === false)) {
      return sendJsonError(res, {
        message: 'Wrong operation! Columns should includ only: title, order'
      });
    }
  }
  try {
    const board = await boardService.update(boardId, req.body);
    if (!board) {
      return sendJsonError(
        res,
        { message: `Board don't exist by id: ${boardId}` },
        HTTP_STATUS.NOT_FOUND
      );
    }
    res.status(HTTP_STATUS.OK).send(board);
  } catch (err) {
    sendJsonError(
      res,
      { message: err.message },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteBoardTreatment = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const board = await boardService.delete(boardId);
    if (!board) {
      return sendJsonError(
        res,
        { message: `Board don't exist by id: ${boardId}` },
        HTTP_STATUS.NOT_FOUND
      );
    }
    res.status(HTTP_STATUS.OK).send(board);
  } catch (err) {
    sendJsonError(
      res,
      { message: err.message },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  getBoardsTreatment,
  getBoardTreatment,
  createBoardTreatment,
  updateBoardTreatment,
  deleteBoardTreatment
};
