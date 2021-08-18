const express = require('express');

const router = express.Router();

const userController = require('../controller/usersController');

router.get('/profile', userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.post('/sign-up', userController.createUser);

module.exports = router;