var express = require("express");
var router = express.Router();
console.log("Routes Quiz");
var quizController = require("../controllers/quizController");

router.post("/quizCadastro", function (req, res) {
    quizController.insertQuiz(req, res);
  });
module.exports = router;