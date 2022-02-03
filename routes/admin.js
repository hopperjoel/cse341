const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const isAuth = require('../middleware/is-auth')

const router = express.Router();

const adminController = require('../controllers/admin')

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);


module.exports = router;