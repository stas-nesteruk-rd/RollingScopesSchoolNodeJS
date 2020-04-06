const express = require('express');
const router = express.Router();

const { userRouter } = require('./resources/user/user.router');
const { boardRouter } = require('./resources/board/board.router');
const { taskRouter } = require('./resources/task/task.router');

router.use(userRouter);
router.use(boardRouter);
router.use(taskRouter);

module.exports = {
  apiRouter: router
};
