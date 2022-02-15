const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const rootDir = require('../util/path');

const isAuth = require('../middleware/is-auth')

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product', 
[
    body("title")
    .isString()
    .isLength({ min: 3 })
    .trim(), 
    body("imageURL").isURL(),
    body("price").isFloat(),
    body("description")
    .isLength({ min: 3, max: 400 })
    .trim()
],
isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

router.post('/edit-product', 
[
    body("title")
    .isString()
    .isLength({ min: 3 })
    .trim(), 
    body("imageURL").isURL(),
    body("price").isFloat(),
    body("description")
    .isLength({ min: 3, max: 400 })
    .trim()
],
isAuth, adminController.postEditProduct);


module.exports = router;