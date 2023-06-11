var database = require("../database/config");

function insertComentario(fkUsuario, comentario) {
  console.log(comentario);
  console.log(fkUsuario);

  var instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `insert into comentarios(fkUsuario, comentario) values
        (${fkUsuario}, ${comentario})`;
    return database.executar(instrucaoSql);
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `insert into comentarios(fkUsuario, comentario) values
        ('${fkUsuario}', '${comentario}')`;
    return database.executar(instrucaoSql);
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
}

function selectComentarios() {
  var instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT us.nome,
    DATE_FORMAT(co.dataPostagem, '%Y-%m-%d %H:%i:%s') AS dataPostagemFormatada,
   co.comentario
   FROM comentarios as co
   JOIN usuario as us ON us.id = co.fkUsuario;`;
    return database.executar(instrucaoSql);
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT us.nome,
    DATE_FORMAT(co.dataPostagem, '%Y-%m-%d %H:%i:%s') AS dataPostagemFormatada,
   co.comentario
   FROM comentarios as co
   JOIN usuario as us ON us.id = co.fkUsuario;`;
    return database.executar(instrucaoSql);
  } else {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }
}

module.exports = {
  insertComentario,
  selectComentarios,
};
