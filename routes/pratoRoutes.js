const express = require("express");
const pratoController = require("../controllers/pratoController");

const router = express.Router();

router.post("/", pratoController.createPrato);
router.get("/", pratoController.getPratos);
router.put("/:id", pratoController.updatePrato);
router.delete("/:id", pratoController.deletePrato);

module.exports = router;
