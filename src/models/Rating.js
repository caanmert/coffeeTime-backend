const mongoose = require('mongoose');

const { Schema } = mongoose;

const RatingSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

  machine: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

  value: {
    type: Schema.Types.Number,
    max: 10,
    min: 1,
  },
  comment: {
    type: Schema.Types.String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Rating = mongoose.model('ratings', RatingSchema);
module.exports = Rating;
