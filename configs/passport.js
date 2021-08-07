const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

const initializePassport = (passport) => {
    passport.use(new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, req.flash('message', { message: 'Username or password incorrect.', type: 'danger' }));
        }
        const isSame = await bcrypt.compare(password, user.password);
        if (!isSame) {
            return done(null, false, req.flash('message', { message: 'Username or password incorrect.', type: 'danger' }));
        }
        console.log('success')
        return done(null, user);
    }));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

module.exports = initializePassport;