const mongoose = require('mongoose');

const { Schema } = mongoose;

const LocationSchema = new Schema({

  city: {
    type: Schema.Types.String,
  },
  type: {
    type: String,
    enum: ['Point', 'Polygon'],
    default: 'Point',
    required: true,
  },
  coordinates: {
    type: Array,
    required: true,
    unique: true,
  },

});

const MachineSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    // required: true,
  },
  machine: {
    type: Schema.Types.String,
    required: true,
  },
  location: {
    type: LocationSchema,
    required: true,
  },
  image: {
    type: [String],
  },
  ratings: {
    type: Schema.Types.ObjectId,
    ref: 'ratings',
  },
  approved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

MachineSchema.index({ location: '2dsphere' });

const Machine = mongoose.model('machines', MachineSchema);
module.exports = Machine;
