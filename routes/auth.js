const path = require('path');

const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const { route } = require('./admin');


router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

module.exports = router;