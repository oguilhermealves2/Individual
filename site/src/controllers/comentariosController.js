var comentariosModel = require("../models/comentariosModel");

console.log("CONTROLLER COMENTARIOS");

function insertComentario(req, res) {
  var fkUsuario = req.body.fkUsuario;
  var comentario = req.body.comentario;

  console.log(fkUsuario);
  console.log(comentario);

  comentariosModel
    .insertComentario(fkUsuario, comentario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao inserir um comentário.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function selectComentarios(req, res) {
  comentariosModel
    .selectComentarios()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao listar todos os comentários.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  insertComentario,
  selectComentarios
};
