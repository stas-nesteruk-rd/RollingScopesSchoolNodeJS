const repositories = require('../../repositories');
const { usersRepo, tasksRepo } = repositories;
const { User } = require('../../models');
const uuid = require('uuid');

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
