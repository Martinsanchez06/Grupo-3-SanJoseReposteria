const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/registro", userController.registro);

router.get("/login", userController.login);

module.exports = router;