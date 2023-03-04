const { validationResult } = require('express-validator');
const User = require("../models/User");
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
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10),
                con_password: bcryptjs.hashSync(req.body.con_password, 10),
                politica:req.body.politica,
                avatar: req.file.filename,
                rolDeUsuario: 2
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

        try {
            db.Usuario.update({
                numeroID: req.body.numeroID,
                nombre: req.body.nombre,
                email: req.body.email,
                fechanacimiento: req.body.fechanacimiento,
                ciudad: req.body.ciudad,
                password: bcryptjs.hashSync(req.body.password, 10),
                con_password:  bcryptjs.hashSync(req.body.con_password, 10),
                politica:req.body.politica,
                avatar: req.file.filename
            }, {
                where : { idUsuarios : req.params.id}
            })
            console.log(req.body);
            res.status(200).redirect('/user/login')
        } catch (error) {
            res.status(400).send('Usuario no actualizado, ha ocurrido un ERROR')
            console.log(error);
        }
       
    },

    login: (req, res) => {
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
            
            if (usuarioParaCrear) {
                let contraseñaCorrecta = bcryptjs.compareSync(req.body.password, usuarioParaCrear.password)
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
                        msg: 'Usuario no valido'
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
            
            res.render("perfilUsuario", {
                user: usuarios
            })
        })
    },
    vistaAdmin: async (req, res) => {
        try {
            if(req.session.usuarioLogueado) {
                if(req.session.usuarioLogueado.rolDeUsuario === 1) {
                    const products = await db.Producto.findAll({
                        include: [{ association: 'categorias' }]
                    });
                    const users = await db.Usuario.findAll();
                    res.render("opcionesDeAdmin", { products, users });
                } else if (req.session.usuarioLogueado.rolDeUsuario !== 1) {
                    res.redirect("/");
                }
            } else {
                res.status(400).send("No encontrado")
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Erro en el servidor")
        }    
    },
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        return res.redirect("/")
    },
    // Requests buttons value and delete the user
    deleteByBtnValue: (req, res) => {
        let btnValue = req.body.deleteBtnList;
        console.log(btnValue);
        db.Usuario.destroy({
            where: {
                idUsuarios: btnValue
            }
        }).then(
            res.redirect("/user/opcionesAdmin")
        ).catch((error) => {
            res.send(error);
            console.log(error);
        })
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