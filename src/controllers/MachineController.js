/* eslint-disable default-case */
const { body, validationResult, query } = require('express-validator');

const MachineService = require('../services/MachineService');

async function addMachine(req, res) {
  const { id } = req.user;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        errors,
      });
    }
    const newMachine = {
      user: id,
      name: req.body.name,
      description: req.body.description,
      location: {
        city: req.body.city,
        coordinates: req.body.coordinates,

      },

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

async function getAllApprovedMachines(req, res) {
  const { lat, long } = req.params;
  try {
    const machines = await MachineService.getAllApprovedMachines(lat, long).populate('user', 'username');
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
        body('coordinates').exists().notEmpty().withMessage('Coordinates field is empty')
          .isArray()
          .isLength(1)
          .withMessage('Coordinates field must be array'),
      ];
    }
    default: {
      return null;
    }
  }
};

module.exports = {
  addMachine,
  getOneMachine,
  getAllMachines,
  getAllApprovedMachines,
  deleteMachine,
  validate,
};
