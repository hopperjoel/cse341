const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const itemsController = require('../controllers/items')

router.get('/items', itemsController.getItems);

module.exports = router;