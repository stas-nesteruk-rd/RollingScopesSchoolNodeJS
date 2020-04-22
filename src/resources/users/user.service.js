const repositories = require('../../repositories');
const { usersRepo, tasksRepo } = repositories;
const { User } = require('../../models');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const generateToken = require('./../../utils/token/generateToken.utils');
const ForbiddenError = require('./../../errors/ForbiddenError');

exports.getTokenByUserCredentials = async (login, password) => {
  const user = await usersRepo.getUserByCredentials(login);
  if (!user) {
    throw new ForbiddenError('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ForbiddenError('Unable to login');
  }
  const token = generateToken(User.toResponse(user).id, login);
  return token;
};

exports.getAll = () => usersRepo.getAll();

exports.getById = id => usersRepo.getById(id);

exports.create = async data => {
  const { name, login, password } = data;
  const user = new User({
    id: uuid(),
    name,
    login,
    password
  });
  return await usersRepo.save(user);
};

exports.update = async (id, data) => {
  const user = await usersRepo.getById(id);
  if (!user) {
    return undefined;
  }
  const updateKeys = Object.keys(data);
  updateKeys.forEach(key => {
    user[key] = data[key];
  });
  return await usersRepo.update(user);
};

exports.delete = async id => {
  const user = await this.getById(id);
  if (!user) {
    return undefined;
  }
  await tasksRepo.updateUserIdOnNullbyId(id);
  return await usersRepo.delete(id);
};
