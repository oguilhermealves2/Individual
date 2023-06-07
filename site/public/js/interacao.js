var proxima = document.getElementById('proxima')
var pontuacao = document.getElementById('pontuacao')
var totalpontuacao = document.getElementById('totalpontuacao')
var cronometro = document.getElementById('cronometro')
var contador = 0
var pontuacaoContador = 0
var duracao = 0
var caixasP = document.querySelectorAll('.caixas_de_perguntas')
var perg = document.querySelectorAll('.caixas_de_perguntas .perguntas input')

proxima.addEventListener('click', function () {
  step()
  duracao = 15
}) 

perg.forEach(function(pergOne) {
  pergOne.addEventListener('click', function(){
  setTimeout(function(){
    step()
    duracao = 15
  }, 500)

  var valid = this.getAttribute("valid");
  if(valid == "valid"){
    pontuacaoContador += 20;
    errosContador = 100 - pontuacaoContador;
    pontuacao.innerHTML = pontuacaoContador;
    totalpontuacao.innerHTML = pontuacaoContador;
  } 

  })
});

function step() {
  contador += 1
  for (var i = 0; i < caixasP.length; i++) {
    caixasP[i].className = 'caixas_de_perguntas'
  } 
  caixasP[contador].className = 'caixas_de_perguntas ativar'
  if (contador == 5) {
    proxima.style.display = 'none'
    clearInterval(duracaoTime);
    cronometro.innerHTML = 0
  }
}

var duracaoTime = setInterval(function(){
  if (duracao == 15) {
    duracao = 0
  }
  duracao +=1
  cronometro.innerHTML = duracao;
  if (cronometro.innerHTML == "15") {
    step()
  }

}, 1000)


if((errosContador + pontuacaoContador) == 100){

  fetch("/quiz/fetchQuiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      acertosServer: nomeVar,
      errosServer: emailVar,
      fkUsuarioServer: sessionStorage.ID_USUARIO
    })
  }).then(function (resposta) {
  
    console.log("resposta: ", resposta);
  
    if (resposta.ok) {
      cardErro.style.display = "block";
  
      mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
  
      setTimeout(() => {
        window.location = "login.html";
      }, "2000")
  
      limparFormulario();
      finalizarAguardar();
    } else {
      throw ("Houve um erro ao tentar realizar o cadastro!");
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
    finalizarAguardar();
  });
  
  return false;
  
  function sumirMensagem() {
  cardErro.style.display = "none"
  }
}
