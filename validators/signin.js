const { check } = require('express-validator');

module.exports = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('The username must be required.'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('The password must be required.'),
];