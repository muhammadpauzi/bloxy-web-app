const Blog = require('../models/Blog');
const { showErrorPage } = require('../helpers');

const home = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({
            createdAt: -1
        });
        res.render('home', {
            user: req.user,
            isAuthenticated: req.isAuthenticated(),
            blogs
        });
    } catch (error) {
        return showErrorPage(res, error);
    }
};

const blog = async (req, res) => {
    try {
        const { slug } = req.params;
        if (slug) {
            const blogBySlug = await Blog.findOne({ slug }).populate('user');
            if (blogBySlug) {
                return res.render('blog', {
                    user: req.user,
                    isAuthenticated: req.isAuthenticated(),
                    blog: blogBySlug
                });
            } else {
                return showErrorPage(res, '', `Blog with ${slug} slug not found.`, 404);
            }
        }
        res.redirect('/');
    } catch (error) {
        return showErrorPage(res, error);
    }
}

module.exports = {
    home,
    blog
}