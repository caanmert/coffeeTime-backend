const { body, validationResult, query } = require('express-validator');

const UserService = require('../services/UserService');

async function addUser(req, res) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        errors,
      });
    }
    const newUser = {
      email: req.body.email,

    };
    const user = await UserService.addUser(newUser);
    return res.status(200).json({
      success: true,
      message: 'Succesfully created',
      user,
    });
  } catch (err) {
    throw new Error(err);
  /*   return res.status(200).json({
      success: false,
      message: err.message,

    }); */
  }
}

module.exports = {
  addUser,
};
