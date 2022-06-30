const express = require("express");

const mainController = require("../controllers/mainController");

const router = express.Router();

router.get("/", mainController.index);

router.get("/registro", mainController.registro);

router.get("/login", mainController.login);

module.exports = router;