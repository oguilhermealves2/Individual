var quizModel = require("../models/quizModel");

console.log("CONTROLER QUIZ");

function insertQuiz(req, res) {

    var acertos = req.body.acertosServer;
    var erros = req.body.errosServer;
    var fkUsuario = req.body.fkUsuarioServer;
    console.log(acertos);
    console.log(fkUsuario);
    console.log(erros);

    console.log(`Recuperando medidas em tempo real`);

    quizModel.insertQuiz(acertos, erros, fkUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    insertQuiz
}