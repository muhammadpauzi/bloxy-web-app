const { check } = require('express-validator');
const User = require('../models/User');

module.exports = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('The username must be required.')
        .custom(value => {
            if (!value.match(/^[a-zA-Z0-9_\-\.]+$/)) {
                throw new Error('The username may only contain alpanumeric, underscore, and dash characters.')
            }
            return true;
        }),
    check('username')
        .custom(async (username) => {
            if (await User.findOne({ username })) {
                throw new Error('The username already registered');
            }
            return true;
        }),
    check('password')
        .not()
        .isEmpty()
        .withMessage('The password must be required.'),
];