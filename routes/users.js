const express = require('express');

const router = express.Router();

const userController = require('../controller/usersController');

router.get('/profile', userController.profile);
router.get('/sign-up', userController.signUp);

module.exports = router;