require('express-async-errors');
const express = require('express');
const { LoginController } = require('../controllers');
const { validateLogin } = require('../middlewares');

const router = express.Router();

router.post('/', validateLogin, LoginController.login);

module.exports = router;
