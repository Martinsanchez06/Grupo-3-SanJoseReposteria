const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();
const multer = require("multer");
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/Productos')
    },
    filename: (req, file, cb) => {
  
        let filename = 'producto' + Date.now() + '_img' + path.extname(file.originalname)
        cb(null, filename)
    }
})

const imagenSubida = multer({ storage })

//----------AQUI LLAMAMOS A UNA RUTA---------- 

router.get("/productdetail", productController.detail);

router.get("/carritoDeCompras", productController.carritoCompras);

router.get("/createProduct", productController.create);

router.get("/editarProduct/:id", productController.editarFormulario);

router.get("/lista", productController.list);

router.get("/detail/:id", productController.singleDetail);


// ----------AQUI CREAMOS UN PRODUCTO-----------

router.post("/createProduct", imagenSubida.array('imagen', 3), productController.guardar);

// ----------AQUI EDITAMOS UN PRODUCTO-----------

router.put("/editarProduct/:id", imagenSubida.single('imagenReg'),  productController.editar);

// ----------AQUI ELIMINAMOS UN PRODUCTO-----------

router.delete("/editarProduct/:id", productController.delete);

module.exports = router;
