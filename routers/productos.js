const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

const multer = require("multer");

router.get("/productdetail", productController.detail);

router.get("/carritoDeCompras", productController.carritoCompras);

router.get("/createProduct", productController.create);

router.get("/editarProduct/:idProduct", productController.editar);

// ----------AQUI CREAMOS UN PRODUCTO-----------

router.post("/createProduct", function(req, res){
    res.send('Post funciona');
});

// ----------AQUI EDITAMOS UN PRODUCTO-----------

router.put("/editarProduct", function(req, res){
    res.send('Put funciona');
});

// ----------AQUI ELIMINAMOS UN PRODUCTO-----------

router.delete("/editarProduct", function(req, res){
    res.send('Delete funciona')
})

module.exports = router;
