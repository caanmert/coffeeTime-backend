const mongoose = require('mongoose');

const { Schema } = mongoose;

const UnregisteredMachineSchema = new Schema({

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
  approved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const UnregisteredMachine = mongoose.model('unregisteredMachines', UnregisteredMachineSchema);
module.exports = UnregisteredMachine;
