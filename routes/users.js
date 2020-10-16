const express = require('express');

const userController = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getHome);

// router.post('/login', authController.postLogin);

module.exports = router;