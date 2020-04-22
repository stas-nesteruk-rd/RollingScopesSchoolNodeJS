const express = require('express');
const {
  getUsersTreatment,
  getUserTreatment,
  createUserTreatment,
  updateUserTreatment,
  deleteUserTreatment,
  loginTreatment
} = require('./user.controller');

const router = express.Router();

router.post('/login', loginTreatment);
router.get('/users', getUsersTreatment);
router.get('/users/:userId', getUserTreatment);
router.post('/users', createUserTreatment);
router.put('/users/:userId', updateUserTreatment);
router.delete('/users/:userId', deleteUserTreatment);

module.exports = {
  userRouter: router
};
