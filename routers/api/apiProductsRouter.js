const express = require("express");
const router = express.Router();
const apiController = require("../../controllers/api/apiProductsController");


router.get("/products", apiController.getAllProducts);


module.exports = router;