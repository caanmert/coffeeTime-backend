const Machine = require('../models/Machine');

const addMachine = (machine) => Machine.create(machine);

const getMachineById = (id) => Machine.findById(id);

const getAllMachines = () => Machine.find({}).sort({ createdAt: -1 });

// const getAllApprovedMachines = () => Machine.find({ approved: true });

const getAllApprovedMachines = () => Machine.find({
  location:
  {
    $nearSphere: {
      $geometry: {
        type: 'Point',
        coordinates: [43.20411575246216, 27.917747387794492],

      },
      $maxDistance: 5000000,
    },
  },
}).limit(5);

const deleteMachine = (id) => Machine.findByIdAndDelete(id);

module.exports = {
  addMachine,
  getMachineById,
  getAllMachines,
  getAllApprovedMachines,
  deleteMachine,
};
