'use strict';

const { Router } = require('express');
const router = Router();
const { db } = require('../database');

/////////////////////////////////////////
// Route for '/'
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

router.post('/contact', (req, res) => {
  //'req.query' -- this is an obj containing a prop for each query string param in the route. If there is no query string, it is '{}'

  //Interfacing with mongodb
  //Grabbing the db and inserting to the 'contact' collection
  db().collection('contact')
  //Use req.body once you have body-parsed the form data
  .insertOne(req.body)
  //Sends a suggestion to the browser that if should redirect to the '/' route
  //Sends error '302'
  .then(() => res.redirect('/'))
  .catch(() => res.send('BAD'));

});

module.exports = router;
