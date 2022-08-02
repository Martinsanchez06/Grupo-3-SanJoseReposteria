function guestMiddleware(req, res, next) {
    if (req.session.usuarioLogueado) {
        return res.redirect("/user/perfil");
    }
    next();
};

module.exports = guestMiddleware;