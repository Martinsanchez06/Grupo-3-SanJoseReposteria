function authMiddleware(req, res, next) {
    if (!req.session.usuarioLogueado) {
        return res.redirect("/user/login");
    }
    next();
};

module.exports = authMiddleware;