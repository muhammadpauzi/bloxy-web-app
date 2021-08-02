const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { signupValidation, signinValidation } = require('../validators');
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.post('/signin', signinValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signin', { errors: errors.mapped(), body: req.body });
    }
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            res.status(404).send("Not Found");
        } else {
            const isSame = await bcrypt.compare(password, user.password);
            if (isSame) {
                res.redirect('dashboard');
            } else {
                res.status(404).send("Password Incorrect");
            }
        }
        console.log("Lewat")
    }
    catch (err) {
        res.status(500);
    }
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', signupValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signup', { errors: errors.mapped(), body: req.body });
    }
    await User.create(req.body);
    res.redirect('/signin');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

module.exports = router;