'use strict';

const { Router } = require('express');
const router = Router();
const Contact = require('../models/contact');
/////////////////////////////////////////


/////////////////////////////////////////
// GET routers
router.get('/', (req, res) => {
  //Will render the index file in the views dir
  res.render('index.pug', {active: true});
});

//Route for about page
router.get('/about', (req, res) => {
  res.render('about.pug', {pageTitle: 'About', active: true});
});

//Route for the contact page
router.get('/contact', (req, res) => {
  res.render('contact.pug', {pageTitle: 'Contact', active: true});

});
/////////////////////////////////////////


/////////////////////////////////////////
//POST routers
router.post('/contact', (req, res) => {

  //Instantiating a new Contact obj
  const msg = Contact(req.body);

  //Then save the new msg object
  msg.save()
    .then(() => res.redirect('/'))
    .catch(() => res.send('BAD'));

});
/////////////////////////////////////////


module.exports = router;
