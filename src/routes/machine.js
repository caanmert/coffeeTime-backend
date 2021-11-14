/* eslint-disable import/extensions */
const router = require('express').Router();
const auth = require('../auth.js');
const MachineController = require('../controllers/MachineController');

router.post('/machines', auth.authenticateToken, (req, res) => {
  MachineController.addMachine(req, res);
});

router.get('/machines/:id', (req, res) => {
  MachineController.getOneMachine(req, res);
});

/* router.get('/machines', (req, res) => {
  console.log('machines');
  MachineController.getAllApprovedMachines(req, res);
}); */

router.get('/machines/mylocation/:lat/:long', (req, res) => {
  console.log('machineslocation');
  MachineController.getAllApprovedMachines(req, res);
});

router.delete('/machines/:id', auth.authenticateToken, (req, res) => {
  MachineController.deleteMachine(req, res);
});

module.exports = router;
