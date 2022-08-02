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
        let filename = 'Usuario#' + Date.now() + '_img' + path.extname(file.originalname)
        cb(null, filename)
    }
})

const imagenSubida = multer({ storage })

const validaciones = [
    body('numeroID').notEmpty().withMessage('Tienes que escribir tu número de identificación'),
    body('nombre').notEmpty().withMessage('Tienes que escribir tu nombre'),
    body('email').notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
    .isEmail().withMessage('Tienes que escribir un correo electrónico válido'),
    body('ciudad').notEmpty().withMessage('Tienes que seleccionar tu ciudad'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('con_password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('imagenReg').custom((value,{ req }) => { 
        let file= req.file;
        let extensionesAceptadas= ['.jpg','.png','.gif'];
        
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else{
            let extensionArchivo= path.extname(file.originalname)
            if (!extensionesAceptadas.includes(extensionArchivo)){
                throw new Error('Las extensiones de archivo permitidas son .jpg .png .gif') ;
            }
    
        }
        return true;
    })
]

// -----AQUI SE LLAMA A LA VISTA DEL REGISTRO-----

router.get("/registro", userController.registro);

// -----AQUI SE PROCESA LA VISTA DEL REGISTRO-----

router.post("/registro", imagenSubida.single('imagenReg'), validaciones, userController.registroProcesado);

// -----AQUI SE LLAMA A LA VISTA DEL LOGIN-----

router.get("/login", userController.login);

// -----AQUI SE LLAMA A LA VISTA DE PROCESAMIENTO DEL LOGIN-----

router.post("/login", validaciones , userController.procesoDeLogin);

module.exports = router;