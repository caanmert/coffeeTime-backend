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
    default: true,
  },
  role: {
    type: String,
    default: 'basic',
    enum: ['basic', 'moderator', 'admin'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
