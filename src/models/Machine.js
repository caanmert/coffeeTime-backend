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
    required: true,
  },
  name: {
    type: Schema.Types.String,
  },
  description: {
    type: Schema.Types.String,
  },
  location: {
    type: LocationSchema,
    required: true,
  },
  ratings: {
    type: Schema.Types.ObjectId,
    ref: 'ratings',
  },
  images: {
    type: Schema.Types.ObjectId,
    ref: 'images',
  },
  approved: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

MachineSchema.index({ location: '2dsphere' });

const Machine = mongoose.model('machines', MachineSchema);
module.exports = Machine;
