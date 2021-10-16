const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: String,
    default: 'basic',
    enum: ['basic', 'admin'],
  },
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;
