require('express-async-errors');
const express = require('express');
const { AccountController } = require('../controllers');
const {
  validateNewAccount, validateDeleteAccount, validateUpdateAccount, validateAuth,
} = require('../middlewares');

const router = express.Router();

router.get('/', AccountController.findAll);

router.post('/', validateNewAccount, AccountController.create);

router.put('/', validateAuth, validateUpdateAccount, AccountController.update);

router.delete('/', validateAuth, validateDeleteAccount, AccountController.deleteAccount);

module.exports = router;
