const { body, validationResult, query } = require('express-validator');
const bcrypt = require('bcryptjs');

const UserService = require('../services/UserService');

async function register(req, res) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        errors,
      });
    }
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 2),
    };
    const user = await UserService.addUser(newUser);
    return res.status(200).json({
      success: true,
      message: 'Succesfully created',
      user,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,

    });
  }
}

async function login(req, res) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        errors,
      });
    }
    const token = await UserService.authenticate(req.body);

    res.header('Authorization', token);

    return res.status(200).json({
      success: true,
      message: 'Succesfully Logged In',
      username: req.body.username,
      token,

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
    case 'login': {
      return [
        body('username').exists().notEmpty().withMessage('Field is empty'),
        body('password').exists().notEmpty().withMessage('Invalid password'),
      ];
    }
    case 'register': {
      return [
        body('username').exists().notEmpty().withMessage('Invalid username'),
        body('email').exists().isEmail().withMessage('Invalid e-mail'),
        body('password').exists().notEmpty().withMessage('Invalid password'),
        body('password2').exists().custom((value, { req }) => value === req.body.password)
          .withMessage('Passwords are not same')
          .notEmpty()
          .withMessage('Invalid Password'),
      ];
    }
    default:
  }
};

module.exports = {
  register,
  login,
  validate,
};
