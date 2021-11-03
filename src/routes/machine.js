const router = require('express').Router();

const MachineController = require('../controllers/MachineController');

router.post('/machines', (req, res) => {
  MachineController.addMachine(req, res);
});

router.get('/machines/:id', (req, res) => {
  MachineController.getOneMachine(req, res);
});

router.get('/machines', (req, res) => {
  MachineController.getAllApprovedMachines(req, res);
});

router.delete('/machines/:id', (req, res) => {
  MachineController.deleteMachine(req, res);
});

module.exports = router;
