const { check } = require('express-validator');
const Blog = require('../models/Blog');

module.exports = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('The title must be required.')
        .trim(),
    check('title')
        .custom(async (title) => {
            if (await Blog.findOne({ title })) {
                throw new Error('The title already registered');
            }
            return true;
        }),
    check('markdown')
        .not()
        .isEmpty()
        .withMessage('The markdown must be required.')
        .trim(),
];