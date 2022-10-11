function userMiddleware(req, res, next) {
    if (req.session.usuarioLogueado === undefined) {
        return res.redirect("/productos/lista");
    } else if (req.session.usuarioLogueado.rolDeUsuario === 2) {
        return res.redirect("/productos/lista"); 
    }
    next();
};

module.exports = userMiddleware;