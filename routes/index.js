const express = require('express');
const router = express.Router();

const homeController = require('../controller/homeController');

router.get('/', homeController.home);

router.use('/users', require('./users'));
console.log("Router Page");

module.exports = router;