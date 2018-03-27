module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user && req.user.profile && req.user.profile._json && req.user.profile._json.is_admin) {
            return next();
        }
        return next();
    }
    return res.NotAdmin();
};