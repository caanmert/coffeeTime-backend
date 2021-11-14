const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const addUser = (user) => User.create(user);

const getUserById = (id) => User.findById(id);

const getUserByUsername = (username) => User.findOne({ username });

const deleteUser = (id) => User.findByIdAndDelete(id);

const getByUsernameorEmail = (usernameOrEmail) => User.findOne({
  $or: [{
    username: usernameOrEmail,
  }, {
    email: usernameOrEmail,
  }],
});

const usernameOrEmail = (data) => {
  if (validator.isEmail(data)) { return 'email'; }
  return 'username';
};

const authenticate = async (params) => {
  const { JWT_SECRET } = process.env;
  const { username, password } = params;

  const user = await getByUsernameorEmail(username);

  if (!user) {
    const credential = usernameOrEmail(username);
    throw new Error(`Invalid ${credential}`);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error('Invalid password');
  }
  const payload = {
    id: user.id,
    name: user.username,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return `Bearer ${token}`;
};

module.exports = {
  addUser,
  getUserById,
  getUserByUsername,
  deleteUser,
  authenticate,
  getByUsernameorEmail,
};
