const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const passport = require('passport');

router
  .route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route('/login')
  .get(users.renderLogin)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
      keepSessionInfo: true,
    }),
    users.login
  );

// router.get('/logout', users.logout);
// router.post('/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     req.flash('success', 'You are logged out');
//     res.redirect('/campgrounds');
//   });
// });

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Goodbye!');
  res.redirect('/campgrounds');
});

module.exports = router;
