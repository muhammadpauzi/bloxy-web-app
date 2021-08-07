const ensureAuth = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/signin');
}

const ensureGuest = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/blogs/dashboard');
    }
    next();
}

module.exports = {
    ensureAuth,
    ensureGuest
}