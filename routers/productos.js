const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

router.get("/productdetail", productController.detail);

router.get("/carritoDeCompras", productController.carritoCompras);

router.get("/createProduct", productController.create);

module.exports = router;
