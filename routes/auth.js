const express = require('express');
const router = express.Router();
const { signupValidation, signinValidation } = require('../validators');
const passport = require('passport');
const { ensureAuth, ensureGuest } = require('../middlewares/authMiddleware');
const { signIn, signInPost, signUp, signUpPost, signOut } = require('../controllers/authController');

router.get('/signin', ensureGuest, signIn);

router.post('/signin', ensureGuest, signinValidation, signInPost, passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin',
    failureFlash: true
}));

router.get('/signup', ensureGuest, signUp);
router.post('/signup', ensureGuest, signupValidation, signUpPost);
router.get('/signout', ensureAuth, signOut);

module.exports = router;