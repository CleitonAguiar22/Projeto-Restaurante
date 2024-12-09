const express = require("express");
const router = express.Router();
const comentariosController = require("../controllers/comentariosController ");

router.post("/adicionar", comentariosController.adicionarComentario);

router.get("/:pratoId", comentariosController.listarComentarios);

module.exports = router;
