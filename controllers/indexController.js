const Blog = require('../models/Blog');

const home = async (req, res) => {
    const blogs = await Blog.find({}).sort({
        createdAt: -1
    });
    res.render('home', {
        user: req.user,
        isAuthenticated: req.isAuthenticated(),
        blogs
    });
};

module.exports = {
    home
}