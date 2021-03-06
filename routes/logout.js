'use strict';

const { Router } = require('express');
const router = Router();
const logout = require('../controllers/session');
/////////////////////////////////////////


/////////////////////////////////////////
//Routes for logout
router.get('/logout', logout.index);

router.post('/logout', logout.destroy);
/////////////////////////////////////////

module.exports = router;
