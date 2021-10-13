const mongoose = require('mongoose');

const { Schema } = mongoose;

const LocationSchema = new Schema({
  longitude: {
    type: Schema.Types.String,
  },
  latitude: {
    type: Schema.Types.String,
  },
});

const RatingSchema = new Schema({
  value: {
    type: Schema.Types.Number,
    max: 10,
    min: 1,
  },
});

const MachineSchema = new Schema({
  machine: {
    type: Schema.Types.String,
    required: true,
  },
  location: LocationSchema,
  image: {
    type: [String],
  },

  ratings: [RatingSchema],

  approved: {
    type: Boolean,
    required: true,
    default: false,
  },

});

const Machine = mongoose.model('machines', MachineSchema);
module.exports = Machine;
