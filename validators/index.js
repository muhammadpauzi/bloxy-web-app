const signinValidation = require('./signin');
const signupValidation = require('./signup');
const createValidation = require('./create');
const editValidation = require('./edit');

module.exports = {
    signinValidation,
    editValidation,
    createValidation,
    signupValidation,
}