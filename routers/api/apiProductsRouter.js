const express = require("express");
const router = express.Router();
const apiController = require("../../controllers/api/apiProductsController");


router.get("/products", apiController.getAllProducts);
router.get("/productDetail/:id", apiController.getProductDetail);


module.exports = router;