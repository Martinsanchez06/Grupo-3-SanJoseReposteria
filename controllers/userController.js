const { validationResult } = require('express-validator')
const User = require("../models/User")
const bcryptjs = require('bcryptjs');
const { clearCookie } = require('express/lib/response');
const db = require("../src/database/models"); 

const userController = {

    registro: (req, res) => {
        db.Usuario.findAll()
        .then(function (usuarios) {
            res.render("registro", { usuarios })
        })
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
        try {
            db.Usuario.create({
                numeroID: req.body.numeroID,
                nombre: req.body.nombre,
                email: req.body.email,
                fechanacimiento: req.body.fechanacimiento,
                ciudad: req.body.ciudad,
                password: bcryptjs.hashSync(req.body.password, 10),
                con_password: bcryptjs.hashSync(req.body.con_password, 10),
                politica:req.body.politica,
                avatar: req.file.filename
            })
            res.status(200).redirect('/user/login')
        } catch (error) {
            res.status(400).send('Usuario no creado')
        }
        

      

    },
    editarUsuario: (req, res) => {
        db.Usuario.findByPk(req.params.id)
        .then(function(usuarios){
            res.render("editarUsuario", { usuarios }); 
        })
    },
    updateUsuario: (req, res) => {

        const resultadoValidacion = validationResult(req)

        console.log(resultadoValidacion.mapped());

        if (resultadoValidacion.errors.length > 0) {
            return res.render("editarUsuario", {
                errors: resultadoValidacion.mapped(),
                datosAntiguos: req.body
            });
        }

        db.Usuario.update({
            numeroID: req.body.numeroID,
            nombre: req.body.nombre,
            email: req.body.email,
            fechanacimiento: req.body.fechanacimiento,
            ciudad: req.body.ciudad,
            password:  bcryptjs.hashSync(req.body.password, 10),
            con_password:  bcryptjs.hashSync(req.body.con_password, 10),
            politica:req.body.politica,
        }, {
            where : { idUsuarios : req.params.id}
        })
        console.log(req.body);
        return res.redirect('/user/login')
    },

    login: (req, res) => {
        console.log(req.cookies);
        console.log(req.cookies.testing);
        db.Usuario.findAll()
        .then(function(usuarios){
            res.render("login", { usuarios }); 
        })
    },

    procesoDeLogin: (req, res) => {

        db.Usuario.findOne({
            where : { 
                email : req.body.email
            }
        })
        .then(function (usuarioParaCrear){
            console.log(usuarioParaCrear);
            console.log(bcryptjs.compareSync(req.body.password, usuarioParaCrear.password))
            console.log(req.body.password)
            console.log(usuarioParaCrear.password)
            if (usuarioParaCrear) {
                let contraseñaCorrecta = bcryptjs.compareSync(req.body.password, usuarioParaCrear.password)
                console.log(contraseñaCorrecta)
                if (contraseñaCorrecta) {
                    req.session.usuarioLogueado = usuarioParaCrear;
                   
                    if (req.body.remember_user) {
                        res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 60 });
                    }
    
                    return res.redirect('/user/perfil');
                } else {
                    return res.render('login', {
                        errors: {
                            email: {
                                msg: 'las credenciales no son validas'
                            }
                        }
                    })
                }
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Este email no esta registrado'
                    }
                }
            })
        } )


        
        
    },
    perfil: (req, res) => {
        let emailEquis = req.session.usuarioLogueado.email
        db.Usuario.findOne({
            where: { email: emailEquis },
        })
        .then(function (usuarios) {
            console.log(usuarios)
            res.render("perfilUsuario", {
                user: usuarios
            })
        })
    },
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect("/")
    },
    destroy: (req, res) => {
        try {
            db.Usuario.destroy({
                where : { 
                    email : req.session.usuarioLogueado.email
                }
            })
            res.clearCookie("userEmail");
            req.session.destroy();
            res.redirect("login")
        } catch (error) {
            res.status(400).send('Usuario no creado')
        }
       
    }
}

module.exports = userController;