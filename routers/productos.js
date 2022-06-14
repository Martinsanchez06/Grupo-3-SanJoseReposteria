const express = require("express");

const productController = require("../controllers/productController");

const router = express.Router();

router.get("/productdetail", productController.detail);

router.get("/carritoDeCompras", productController.carritoCompras);

module.exports = router;
