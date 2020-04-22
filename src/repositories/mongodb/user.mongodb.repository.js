const { User } = require('../../models');

exports.getUserByCredentials = async login => {
  return User.findOne({ login });
};

exports.getAll = async () => {
  return User.find({});
};

exports.getById = async id => {
  return User.findOne({ _id: id });
};

exports.save = async user => {
  return User.create(user);
};

exports.update = async updatedUser => {
  return User.findByIdAndUpdate(updatedUser._id, updatedUser, {
    new: true,
    runValidators: true
  });
};

exports.delete = async id => {
  return User.findByIdAndDelete(id);
};
