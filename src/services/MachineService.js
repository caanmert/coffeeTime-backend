const Machine = require('../models/Machine');

const addMachine = (machine) => Machine.create(machine);

const getMachineById = (id) => Machine.findById(id);

const getAllMachines = () => Machine.find({}).sort({ createdAt: -1 });

// const getAllApprovedMachines = () => Machine.find({ approved: true });

const getAllApprovedMachines = (lat, long) => Machine.find({
  approved: true,
  location:
  {
    $nearSphere: {
      $geometry: {
        type: 'Polygon',
        // coordinates: [43.20411575246216, 27.917747387794492],
        coordinates: [parseFloat(long), parseFloat(lat)],

      },
      $maxDistance: 5000000,
    },
  },
}).limit(30);

const deleteMachine = (id) => Machine.findByIdAndDelete(id);

module.exports = {
  addMachine,
  getMachineById,
  getAllMachines,
  getAllApprovedMachines,
  deleteMachine,
};
