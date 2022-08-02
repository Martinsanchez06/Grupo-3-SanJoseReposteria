const { validationResult } = require('express-validator')
const User = require("../models/User")
const bcryptjs = require('bcryptjs');


const userController = {

    registro: (req, res) => {
        res.render("registro");
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
        res.render("login");
    },
    perfil: (req, res) => {
        res.render("perfilUsuario", {
            user: req.session.usuarioLogueado
        });
    },

    procesoDeLogin: (req, res) => {

        let usuarioParaCrear = User.findByField('email', req.body.email)

        if (usuarioParaCrear) {
            let contraseñaCorrecta = bcryptjs.compareSync(req.body.password, usuarioParaCrear.password)
            if (contraseñaCorrecta) {
                delete usuarioParaCrear.password;
                req.session.usuarioLogueado = usuarioParaCrear;
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
    logout: (req, res) => {
        req.session.destroy();
        return res.redirect("/")
    }
}

module.exports = userController;