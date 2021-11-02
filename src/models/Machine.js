const mongoose = require('mongoose');

const { Schema } = mongoose;

/* const LocationSchema = new Schema({

  city: {
    type: Schema.Types.String,
  },
  longitude: {
    type: Schema.Types.String,
  },
  latitude: {
    type: Schema.Types.String,
  },
}); */

const RatingSchema = new Schema({
  comment: {
    type: Schema.Types.String,
  },
  value: {
    type: Schema.Types.Number,
    max: 10,
    min: 1,
  },
});

const MachineSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

  machine: {
    type: Schema.Types.String,
    required: true,
  },
  city: {
    type: Schema.Types.String,
  },
  coordinates: [],
  image: {
    type: [String],
  },

  ratings: [RatingSchema],

  approved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Machine = mongoose.model('machines', MachineSchema);
module.exports = Machine;
