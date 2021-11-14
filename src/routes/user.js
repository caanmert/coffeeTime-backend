const router = require('express').Router();

const UserController = require('../controllers/UserController');

router.post('/register', UserController.validate('register'), (req, res) => {
  UserController.register(req, res);
});

router.post('/login', UserController.validate('login'),
  (req, res) => {
    UserController.login(req, res);
  });

module.exports = router;
