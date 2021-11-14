const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = new Schema({

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
  image: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model('images', ImageSchema);
module.exports = Image;
