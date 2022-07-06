const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

//const multer = require("multer");

router.get("/productdetail", productController.detail);

router.get("/carritoDeCompras", productController.carritoCompras);

router.get("/createProduct", productController.create);

router.get("/editarProduct/:idProduct", productController.editar);

// ----------AQUI CREAMOS UN PRODUCTO-----------

router.post("/createProduct", productController.guardar);

router.get("/lista", productController.list);

router.get("/detail", productController.singleDetail);

router.put("/editarProduct", function (req, res) {
    res.send('lo logre');
});

// ----------AQUI EDITAMOS UN PRODUCTO-----------

router.put("/editarProduct", function (req, res) {
    res.send('Put funciona');
});

// ----------AQUI ELIMINAMOS UN PRODUCTO-----------

router.delete("/editarProduct", function (req, res) {
    res.send('Delete funciona')
})

module.exports = router;
