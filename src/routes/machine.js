const router = require('express').Router();

const MachineController = require('../controllers/MachineController');

router.post('/machine', MachineController.validate('add'), (req, res) => {
  MachineController.addMachine(req, res);
});

router.get('/machine', (req, res) => {
  MachineController.getAllMachines(req, res);
});

module.exports = router;
