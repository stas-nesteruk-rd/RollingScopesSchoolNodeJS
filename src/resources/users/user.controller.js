const HTTP_STATUS = require('http-status');
const userService = require('./user.service');
const ValidationError = require('./../../errors/ValidationError');
const ResourceNotFoundError = require('./../../errors/ResourceNotFoundError');
const checkUUID = require('./../../utils/checkUUID/checkUUID.utils');
const { User } = require('../../models');

const loginTreatment = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const token = await userService.getTokenByUserCredentials(login, password);
    res.status(HTTP_STATUS.OK).send({ token });
  } catch (error) {
    return next(error);
  }
};

const getUsersTreatment = async (req, res, next) => {
  try {
    console.log(req.user);
    const users = await userService.getAll();
    res.status(HTTP_STATUS.OK).send(users.map(User.toResponse));
  } catch (err) {
    return next(err);
  }
};

const getUserTreatment = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    checkUUID(userId);
    const user = await userService.getById(userId);
    if (!user) {
      throw new ResourceNotFoundError(`User don't exist by id: ${userId}`);
    }
    res.status(HTTP_STATUS.OK).send(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
};

const createUserTreatment = async (req, res, next) => {
  try {
    const keys = Object.keys(req.body);
    const requiredFields = ['name', 'login', 'password'];
    const isValidOperation = requiredFields.every(key => keys.includes(key));
    if (!isValidOperation) {
      throw new ValidationError('Wrong operation! Send: name, login, password');
    }
    const user = await userService.create(req.body);
    res.status(HTTP_STATUS.OK).send(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
};

const updateUserTreatment = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    checkUUID(userId);
    const keys = Object.keys(req.body);
    const allowedUpdates = ['id', 'name', 'login', 'password'];
    const isValidOperation = keys.every(key => allowedUpdates.includes(key));
    if (!isValidOperation) {
      throw new ValidationError(
        'Wrong operation! Allowed update fields: name, login, password'
      );
    }
    const user = await userService.update(userId, req.body);
    if (!user) {
      throw new ResourceNotFoundError(`User don't exist by id: ${userId}`);
    }
    res.status(HTTP_STATUS.OK).send(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
};

const deleteUserTreatment = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    checkUUID(userId);
    const user = await userService.delete(userId);
    if (!user) {
      throw new ResourceNotFoundError(`User don't exist by id: ${userId}`);
    }
    res.status(HTTP_STATUS.NO_CONTENT).send('The user has been deleted');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUsersTreatment,
  getUserTreatment,
  createUserTreatment,
  updateUserTreatment,
  deleteUserTreatment,
  loginTreatment
};
