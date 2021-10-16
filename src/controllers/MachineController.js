/* eslint-disable default-case */
const { body, validationResult, query } = require('express-validator');

const MachineService = require('../services/MachineService');

async function addMachine(req, res) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      res.status(200).json({
        success: false,
        errors,
      });
    }
    const newMachine = {
      machine: req.body.machine,
      location: {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
      },
      ratings: { value: req.body.value },
    };
    const machine = await MachineService.addMachine(newMachine);
    return res.status(200).json({
      success: true,
      message: 'Succesfully created',
      machine,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
    });
  }
}

async function getAllMachines(req, res) {
  try {
    const machines = await MachineService.getAllMachines();
    return res.status(200).json({
      success: true,
      machines,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
    });
  }
}

async function getOneMachine(req, res) {
  const { id } = req.params;
  try {
    const machine = await MachineService.getMachineById(id);
    return res.status(200).json({
      success: true,
      machine,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
    });
  }
}

async function deleteMachine(req, res) {
  // const userId = req.user.id;
  const { id } = req.params;

  try {
    await MachineService.deleteMachine(id);
    return res.status(200).json({
      success: true,
      message: 'Machine is deleted',
    });
  } catch (err) {
    return res.status(200).json({
      succcess: false,
      message: err.message,
    });
  }
}

const validate = (method) => {
  switch (method) {
    case 'add': {
      return [
        body('machine').exists().notEmpty().withMessage('Machine Field is empty'),

      ];
    }
  }
};

module.exports = {
  addMachine,
  getOneMachine,
  getAllMachines,
  deleteMachine,
  validate,
};
