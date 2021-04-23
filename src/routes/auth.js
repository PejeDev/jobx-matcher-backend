'use strict';
const express = require('express');
const router = express.Router();
const AuthController = require.main.require('./controllers/auth');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

module.exports = router;
