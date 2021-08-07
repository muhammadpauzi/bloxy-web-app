const User = require('../models/User');
const { validationResult } = require('express-validator');
const { showErrorPage } = require('../helpers');

const signIn = (req, res) => {
    res.render('auth/signin', {
        message: req.flash('message')[0],
        old: null
    });
};

const signInPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('auth/signin', { errors: errors.mapped(), old: req.body });
    }
    next();
};

const signUp = (req, res) => {
    res.render('auth/signup', {
        old: null
    });
};

const signUpPost = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('auth/signup', { errors: errors.mapped(), old: req.body });
        }
        await User.create(req.body);
        req.flash('message', { message: 'Congratulations, Your account has been successfully registered.', type: 'success' });
        res.redirect('/auth/signin');
    } catch (error) {
        return showErrorPage(res, error);
    }
};

const signOut = (req, res) => {
    req.logout();
    res.redirect('/auth/signin');
};

module.exports = {
    signIn,
    signInPost,
    signUp,
    signUpPost,
    signOut,
}