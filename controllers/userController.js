const { validationResult } = require('express-validator')
const User = require("../models/User")
const bcryptjs = require('bcryptjs');
const { clearCookie } = require('express/lib/response');


const userController = {

    registro: (req, res) => {
        res.cookie("testing", "", { maxAge: 1000 * 30 });
    },
    registroProcesado: (req, res) => {
        const resultadoValidacion = validationResult(req)

        console.log(resultadoValidacion.mapped());

        if (resultadoValidacion.errors.length > 0) {
            return res.render("registro", {
                errors: resultadoValidacion.mapped(),
                datosAntiguos: req.body
            });
        }

        let usuarioEnDB = User.findByField('email', req.body.email)

        if (usuarioEnDB) {
            return res.render('registro', {
                errors: {
                    email: {
                        msg: 'Este email ya esta registrado'
                    }
                },
                datosAntiguos: req.body
            })
        }

        let usuarioParaCrear = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            con_password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }

        User.create(usuarioParaCrear);
        return res.redirect('/user/login')
    },

    login: (req, res) => {
        console.log(req.cookies);
        console.log(req.cookies.testing);
        res.render("login");
    },

    procesoDeLogin: (req, res) => {
        return res.send(req.body);

        let usuarioParaCrear = User.findByField('email', req.body.email)

        if (usuarioParaCrear) {
            let contraseñaCorrecta = bcryptjs.compareSync(req.body.password, usuarioParaCrear.password)
            if (contraseñaCorrecta) {
                delete usuarioParaCrear.password;
                delete usuarioParaCrear.con_password;
                req.session.usuarioLogueado = usuarioParaCrear;

                if (req.body.remember_user) {
                    res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 2 });
                }

                return res.redirect('/user/perfil');
            }
            
        return res.render('login', {
            errors: {
                email: {
                    msg: 'las credenciales no son validas'
                }
            }
        })
        }
        return res.render('login', {
            errors: {
                email: {
                    msg: 'Este email no esta registrado'
                }
            }
        })

    },
    perfil: (req, res) => {
        console.log(req.cookies.userEmail);
        console.log('PRUEBA AQUI');
        console.log(req.session);
        res.render("perfilUsuario", {
            user: req.session.usuarioLogueado
        });
    },
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect("/")
    }
}

module.exports = userController;