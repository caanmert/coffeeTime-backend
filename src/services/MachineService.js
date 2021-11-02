const Machine = require('../models/Machine');

const addMachine = (machine) => Machine.create(machine);

const getMachineById = (id) => Machine.findById(id);

const getAllMachines = () => Machine.find({}).sort({ createdAt: -1 });

const getAllApprovedMachines = () => Machine.find({ approved: true });

const deleteMachine = (id) => Machine.findByIdAndDelete(id);

module.exports = {
  addMachine,
  getMachineById,
  getAllMachines,
  getAllApprovedMachines,
  deleteMachine,
};
