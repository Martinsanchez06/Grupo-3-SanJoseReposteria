const { validationResult } = require('express-validator')

const userController = {
    
    registro: (req, res) => {
        res.render("registro");
    },
    registroProcesado: (req, res) => {
        const resultadoValidacion = validationResult(req)

        console.log(resultadoValidacion.mapped()); 

        if(resultadoValidacion.errors.length > 0) {
            return res.render("registro", {
                errors : resultadoValidacion.mapped()
            })
        }
    },
    login: (req, res) => {
        res.render("login");
    },
}

module.exports = userController;