const User = require('../models/User');

const addUser = (user) => User.create(user);

const getUserById = (id) => User.findById(id);

const deleteUser = (id) => User.findByIdAndDelete(id);

module.exports = {
  addUser,
  getUserById,
  deleteUser,
};
