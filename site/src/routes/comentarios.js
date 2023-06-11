var express = require("express");
var router = express.Router();

console.log("Routes Comentarios");
var comentariosController = require("../controllers/comentariosController");

router.post("/novoComentario", function (req, res) {
  comentariosController.insertComentario(req, res);
});

router.get("/listarComentarios", function (req, res) {
  comentariosController.selectComentarios(req, res);
});

module.exports = router;
