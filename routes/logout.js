'use strict';

const { Router } = require('express');
const router = Router();
/////////////////////////////////////////


/////////////////////////////////////////
//Routes for logout
router.get('/logout', (req, res) => {
  res.render('logout');
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/login');
  });
});

/////////////////////////////////////////

module.exports = router;
