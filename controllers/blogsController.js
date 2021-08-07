const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');

const dashboard = async (req, res) => {
    const blogs = await Blog.find({ idUser: req.user.id }).sort({
        createdAt: -1
    });
    res.render('blogs/dashboard', {
        user: req.user,
        isAuthenticated: req.isAuthenticated(),
        blogs
    });
};

const create = (req, res) => {
    res.render('blogs/create', {
        user: req.user,
        isAuthenticated: req.isAuthenticated(),
        old: null
    });
}

const createPost = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('blogs/create', { errors: errors.mapped(), old: req.body });
        }
        // set id
        req.body.idUser = req.user.id;
        await Blog.create(req.body);
        req.flash('message', { message: 'Blog has been created.', type: 'success' });
        res.redirect('/blogs/dashboard');
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    dashboard,
    create,
    createPost
}