const { validationResult } = require('express-validator')
const User = require("../models/User")

const userController = {
    
    registro: (req, res) => {
        res.render("registro");
    },
    registroProcesado: (req, res) => {
        const resultadoValidacion = validationResult(req)

        console.log(resultadoValidacion.mapped()); 

        if(resultadoValidacion.errors.length > 0) {
            return res.render("registro", {
                errors : resultadoValidacion.mapped(),
                datosAntiguos: req.body
            });
        }

        User.create(req.body);
        return res.send('Okay, las validaciones se pasaron y no tienes errores')
    },
    login: (req, res) => {
        res.render("login");
    },
}

module.exports = userController;