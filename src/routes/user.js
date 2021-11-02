const router = require('express').Router();

const UserController = require('../controllers/UserController');

router.post('/register', (req, res) => {
  UserController.addUser(req, res);
});

module.exports = router;
