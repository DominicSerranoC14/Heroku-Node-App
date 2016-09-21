'use strict';

const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const login = require('../controllers/login');
/////////////////////////////////////////


/////////////////////////////////////////
//Login routes
router.get('/login', login.new);
router.post('/login', login.create);
/////////////////////////////////////////


module.exports = router;
