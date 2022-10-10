const User = require("../models/User");

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField("email", emailInCookie);


    if (userFromCookie) {
        req.session.userlogged = userFromCookie;
    }

    if (req.session && req.session.usuarioLogueado) {
        res.locals.isLogged = true;
        res.locals.userlogged = req.session.userlogged;
        if (req.session.usuarioLogueado.rolDeUsuario === 1) {
            res.locals.usuarioAdmin = true;
          }
        
    }







    next();
};

module.exports = userLoggedMiddleware;