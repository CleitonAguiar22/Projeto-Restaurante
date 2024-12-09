const express = require("express");
const usuarioController = require("../controllers/usuarioController");

const router = express.Router();

router.get("/", usuarioController.getUsuarios);

router.post("/", usuarioController.registerUsuario);

router.delete("/:id", usuarioController.deleteUsuario);

module.exports = router;
