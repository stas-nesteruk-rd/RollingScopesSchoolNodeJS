const express = require('express');
const {
  getTasksTreatment,
  getTaskTreatment,
  createTaskTreatment,
  updateTaskTreatment,
  deleteTaskTreatment
} = require('./task.controller');

const router = express.Router();

router.get('/boards/:boardId/tasks', getTasksTreatment);
router.get('/boards/:boardId/tasks/:taskId', getTaskTreatment);
router.post('/boards/:boardId/tasks', createTaskTreatment);
router.put('/boards/:boardId/tasks/:taskId', updateTaskTreatment);
router.delete('/boards/:boardId/tasks/:taskId', deleteTaskTreatment);

module.exports = {
  taskRouter: router
};
