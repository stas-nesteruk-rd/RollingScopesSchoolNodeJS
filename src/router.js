const express = require('express');
const router = express.Router();

const { userRouter } = require('./resources/users/user.router');
const { boardRouter } = require('./resources/boards/board.router');
const { taskRouter } = require('./resources/tasks/task.router');

router.use(userRouter);
router.use(boardRouter);
router.use(taskRouter);

module.exports = {
  apiRouter: router
};
