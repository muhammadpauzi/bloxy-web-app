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

module.exports = {
    home
}