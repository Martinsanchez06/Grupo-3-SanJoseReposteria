const express = require("express");

const productController = require("../controllers/productController");
const userMiddleware = require("../middlewares/userMiddleware");
const router = express.Router();
const multer = require("multer");
const { body } = require("express-validator")
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/Productos')
    },
    filename: (req, file, cb) => {
        console.log(file);
        let filename = file.originalname 
        cb(null, filename)
    }
})

const imagenSubida = multer({ storage })

const validaciones = [
    body('nombre').notEmpty().withMessage('Tienes que escribir el nombre del producto'),
    body('precio').notEmpty().withMessage('Tienes que escribir el precio del producto'),
    body('tamanio').notEmpty().withMessage('Tienes que escribir el tamaño del producto'),
    body('categoria').notEmpty().withMessage('Tienes que seleccionar la categoria del producto'),
    body('descripcion').notEmpty().withMessage('Tienes que escribir la descripcion del producto'),
    body('imagen').custom((value,{ req }) => { 
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

//----------AQUI LLAMAMOS A UNA RUTA---------- 

router.get("/productdetail/:id", productController.detail);

router.get("/carritoDeCompras", productController.carritoCompras);

router.get("/createProduct", userMiddleware, productController.create);

router.get("/editarProduct/:id", userMiddleware, productController.editarFormulario);

router.get("/lista", productController.list);

router.get("/detail/:id", productController.singleDetail);

router.get("/resultado", productController.search);

// ----------AQUI CREAMOS UN PRODUCTO-----------

router.post("/createProduct", imagenSubida.array('imagen', 3), validaciones ,productController.guardar);

// ----------AQUI EDITAMOS UN PRODUCTO-----------

router.put("/editarProduct/:id", imagenSubida.array('imagen', 3), validaciones ,productController.editar);

// ----------AQUI ELIMINAMOS UN PRODUCTO-----------

router.delete("/editarProduct/:id", productController.delete);
router.post("/deleteFromList", productController.deleteByBtnValue);

module.exports = router;
