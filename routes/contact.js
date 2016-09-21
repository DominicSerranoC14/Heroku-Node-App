'use strict';

const { Router } = require('express');
const router = Router();
const contact = require('../controllers/contact');
/////////////////////////////////////////


/////////////////////////////////////////
//Routes for the contact page
router.get('/contact', contact.new);

router.post('/contact', contact.create);
/////////////////////////////////////////


module.exports = router;
