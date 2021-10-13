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
      approved: false,
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

const validate = (method) => {
  switch (method) {
    case 'add': {
      return [
        body('machine').exists().notEmpty().withMessage('Machine Field is empty'),
        body('approved').exists().notEmpty().withMessage('Approved field is empty'),
      ];
    }
  }
};

module.exports = {
  addMachine,
  getAllMachines,
  validate,
};
