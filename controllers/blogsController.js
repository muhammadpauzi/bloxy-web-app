const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');
const { showErrorPage, isIDValid } = require('../helpers');

const dashboard = async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id }).sort({
            createdAt: -1
        });
        res.render('blogs/dashboard', {
            message: req.flash('messageBlog')[0],
            user: req.user,
            isAuthenticated: req.isAuthenticated(),
            blogs
        });
    } catch (error) {
        return showErrorPage(res, error);
    }
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
        req.body.user = req.user.id;
        await Blog.create(req.body);
        req.flash('messageBlog', { message: 'Blog has been created.', type: 'success' });
        res.redirect('/blogs/dashboard');
    } catch (err) {
        return showErrorPage(res, error);
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            isValid = isIDValid(id);
            if (isValid) {
                const blog = await Blog.findById(id);
                if (blog) {
                    if (blog.user == req.user.id) {
                        blog.remove();
                        req.flash('messageBlog', { message: 'Blog has been deleted.', type: 'success' });
                    } else {
                        return showErrorPage(res, '', "You don't have access to this page.", 403);
                    }
                } else {
                    return showErrorPage(res, '', 'Blog not found.', 404);
                }
            }
        }
        res.redirect('/blogs/dashboard');
    } catch (error) {
        return showErrorPage(res, error);
    }
}

module.exports = {
    dashboard,
    create,
    createPost,
    deleteBlog
}