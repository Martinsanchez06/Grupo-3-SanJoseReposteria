const express = require("express");
const router = express.Router();
const apiUsuariosController = require("../../controllers/api/apiUsuariosController");


router.get("/usuarios", apiUsuariosController.getAllUsuarios);
router.get("/usuarios/:id", apiUsuariosController.getUsuariosDetalle);

module.exports = router;