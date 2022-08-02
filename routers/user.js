const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();
const path = require("path")
const multer = require("multer");

const { body } = require("express-validator")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars')
    },
    filename: (req, file, cb) => {
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, filename)
    }
})

const imagenSubida = multer({ storage })

const validaciones = [
    body('numeroID').notEmpty().withMessage('tienes que escribir tu numero de identificacion'),
    body('nombre').notEmpty().withMessage('tienes que escribir tu nombre'),
    body('email').notEmpty().withMessage('tienes que escribir un correo electronico'),
    body('ciudad').notEmpty().withMessage('tienes que seleccionar tu ciudad'),
    body('password').notEmpty().withMessage('tienes que escribir una contraseña'),
    body('con_password').notEmpty().withMessage('tienes que escribir una contraseña'),
]

// -----AQUI SE LLAMA A LA VISTA DEL REGISTRO-----

router.get("/registro", userController.registro);

// -----AQUI SE PROCESA LA VISTA DEL REGISTRO-----

router.post("/registro", imagenSubida.single('imagenReg'), validaciones, userController.registroProcesado);

// -----AQUI SE LLAMA A LA VISTA DEL LOGIN-----

router.get("/login", userController.login);

module.exports = router;