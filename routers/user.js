const express = require("express");
const userController = require("../controllers/userController");
const guestMiddelware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const path = require("path")
const multer = require("multer");

const { body } = require("express-validator")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars')
    },
    filename: (req, file, cb) => {
        let filename = 'usuario' + Date.now() + '_img' + path.extname(file.originalname)
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

router.get("/registro", guestMiddelware, userController.registro);

// -----AQUI SE PROCESA LA VISTA DEL REGISTRO-----

router.post("/registro", imagenSubida.single('imagenReg'), validaciones, userController.registroProcesado);

// -----AQUI SE LLAMA A LA VISTA DE EDITAR EL USUARIO-----

router.get("/editarUsuario/:id",userController.editarUsuario);

// -----AQUI SE PROCESA LA VISTA DE EDITAR EL USUARIO-----

router.put("/editarUsuario/:id",userController.updateUsuario);

// -----AQUI SE LLAMA A LA VISTA DEL LOGIN-----

router.get("/login", guestMiddelware, userController.login);

// -----AQUI SE PROCESA EL LOGIN------

router.post("/login", validaciones , userController.procesoDeLogin);

//-----AQUI SE LLAMA A LA VISTA DE PERFIL DEL USUARIO----

router.get("/perfil", authMiddleware, userController.perfil);

//-----PROCESO DE LOGOUT----

router.get("/logout/", userController.logout);

// ------AQUI ELIMINAMOS UN USUARIO------

router.delete("/perfil", userController.destroy);

module.exports = router;