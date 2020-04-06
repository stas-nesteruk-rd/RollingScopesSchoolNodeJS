const express = require('express');
const {
  getBoardTreatment,
  getBoardsTreatment,
  createBoardTreatment,
  updateBoardTreatment,
  deleteBoardTreatment
} = require('./board.controller');
const router = express.Router();

router.get('/boards', getBoardsTreatment);
router.get('/boards/:boardId', getBoardTreatment);
router.post('/boards', createBoardTreatment);
router.put('/boards/:boardId', updateBoardTreatment);
router.delete('/boards/:boardId', deleteBoardTreatment);

module.exports = {
  boardRouter: router
};
