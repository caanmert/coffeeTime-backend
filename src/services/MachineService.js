const Machine = require('../models/Machine');

const addMachine = (machine) => Machine.create(machine);

const getMachineById = (id) => Machine.findById(id);

const getAllMachines = () => Machine.find({});

const deleteMachine = (id) => Machine.findByIdAndDelete(id);

module.exports = {
  addMachine,
  getMachineById,
  getAllMachines,
  deleteMachine,
};
