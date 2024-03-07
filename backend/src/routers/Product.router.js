require('express-async-errors');
const express = require('express');
const { ProductController } = require('../controllers');
const {
  validateAuth, validateUpdateProduct, validateDeleteProduct, validateNewProduct,
} = require('../middlewares');

const router = express.Router();

router.get('/', validateAuth, ProductController.findAll);

router.post('/', validateAuth, validateNewProduct, ProductController.create);

router.put('/', validateAuth, validateUpdateProduct, ProductController.update);

router.delete('/:id', validateAuth, validateDeleteProduct, ProductController.deleteProduct);

router.get('/account', validateAuth, ProductController.findByAccountId);

module.exports = router;
