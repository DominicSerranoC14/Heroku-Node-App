'use strict';

const { Router } = require('express');
const router = Router();
const root = require('../controllers/root');
/////////////////////////////////////////

/////////////////////////////////////////
router.get('/', root);
/////////////////////////////////////////

module.exports = router;
