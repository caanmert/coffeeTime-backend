const Machine = require('../models/Machine');

const addMachine = (machine) => Machine.create(machine);

const getAllMachines = () => Machine.find({});

const deleteMachine = (id) => Machine.findByIdAndDelete(id);

module.exports = {
  addMachine,
  getAllMachines,
  deleteMachine,
};
