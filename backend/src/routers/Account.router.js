require('express-async-errors');
const express = require('express');
const { AccountController } = require('../controllers');
const { validateNewAccount, validateDeleteAccount } = require('../middlewares');

const router = express.Router();

router.get('/', AccountController.findAll);

router.post('/', validateNewAccount, AccountController.create);

router.put('/', AccountController.update);

router.delete('/', validateDeleteAccount, AccountController.deleteAccount);

module.exports = router;
