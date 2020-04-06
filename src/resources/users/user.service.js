const usersRepo = require('./../../repositories/user.memory.repository');
const taskRepo = require('./../../repositories/task.memory.repository');
const User = require('./../../models/user.model');
const uuid = require('uuid');

exports.getAll = () => usersRepo.getAll();

exports.getById = id => usersRepo.getById(id);

exports.create = data => {
  const { name, login, password } = data;
  const user = new User({
    id: uuid(),
    name,
    login,
    password
  });
  usersRepo.save(user);
  return user;
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
  usersRepo.update(user);
  return user;
};

exports.delete = async id => {
  const user = await this.getById(id);
  if (!user) {
    return undefined;
  }
  await taskRepo.updateUserIdOnNullbyId(id);
  await usersRepo.delete(id);
  return user;
};
