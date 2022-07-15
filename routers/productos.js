const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();
//const multer = require("multer");


//----------AQUI LLAMAMOS A UNA RUTA---------- 

router.get("/productdetail", productController.detail);

router.get("/carritoDeCompras", productController.carritoCompras);

router.get("/createProduct", productController.create);

router.get("/editarProduct/:id", productController.editarFormulario);

router.get("/lista", productController.list);

router.get("/detail/:id", productController.singleDetail);

// ----------AQUI CREAMOS UN PRODUCTO-----------

router.post("/createProduct", productController.guardar);

// ----------AQUI EDITAMOS UN PRODUCTO-----------

router.put("/editarProduct/:id", productController.editar);

// ----------AQUI ELIMINAMOS UN PRODUCTO-----------

router.delete("/editarProduct/:id", productController.delete);

module.exports = router;
