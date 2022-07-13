const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();
//const multer = require("multer");


//----------AQUI LLAMAMOS A UNA RUTA---------- 

router.get("/productdetail", productController.detail);

router.get("/carritoDeCompras", productController.carritoCompras);

router.get("/createProduct", productController.create);

router.get("/editarProduct/:id", productController.editar);

router.get("/lista", productController.list);

router.get("/detail", productController.singleDetail);

// ----------AQUI CREAMOS UN PRODUCTO-----------

router.post("/createProduct", productController.guardar);

// ----------AQUI EDITAMOS UN PRODUCTO-----------

router.put("/editarProduct/:idProduct", productController.editar);

// ----------AQUI ELIMINAMOS UN PRODUCTO-----------

router.delete("/lista", productController.delete);

module.exports = router;
