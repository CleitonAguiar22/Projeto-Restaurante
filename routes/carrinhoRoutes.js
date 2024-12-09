const express = require("express");
const carrinhoController = require("../controllers/carrinhoController");

const router = express.Router();

router.post("/", carrinhoController.adicionarAoCarrinho);
router.get("/", carrinhoController.listarCarrinho);
router.delete("/:itemId", carrinhoController.removerDoCarrinho);
router.post("/finalizar-compra", carrinhoController.finalizarCompra);

module.exports = router;
