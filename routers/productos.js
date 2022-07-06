const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();
//const multer = require("multer");


//----------AQUI LLAMAMOS A UNA RUTA---------- 

router.get("/productdetail", productController.detail);

router.get("/carritoDeCompras", productController.carritoCompras);

router.get("/createProduct", productController.create);

router.get("/editarProduct/:idProduct", productController.editar);

router.get("/lista", productController.list);

// ----------AQUI CREAMOS UN PRODUCTO-----------

router.post("/createProduct", productController.guardar);


// ----------AQUI EDITAMOS UN PRODUCTO-----------

router.put("/editarProduct", productController.editar);

// ----------AQUI ELIMINAMOS UN PRODUCTO-----------

router.delete("/editarProduct", function (req, res) {
    res.send('Delete funciona')
})

module.exports = router;
