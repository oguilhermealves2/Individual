var database = require('../database/config')

function buscarUltimasMedidas(idAquario, limite_linhas) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT nome as Nome, ROUND(AVG(acertos), 0) AS Acertos, ROUND(AVG(erros), 0) AS Erros
        FROM quiz
        JOIN usuario ON usuario.id = fkUsuario
        GROUP BY fkUsuario;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `  SELECT nome as Nome, ROUND((SUM(acertos) / (COUNT(*) * 100)) * 100, 1) AS Acertos,
        ROUND((SUM(erros) / (COUNT(*) * 100)) * 100, 1) AS Erros FROM quiz join usuario on fkUsuario = usuario.id
            group by fkUsuario order by  fkUsuario desc limit 5;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarUltimasMedidas2(idAquario, limite_linhas) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `SELECT nome as Nome, ROUND(AVG(acertos), 0) AS Acertos, ROUND(AVG(erros), 0) AS Erros
        FROM quiz1
        JOIN usuario ON usuario.id = fkUsuario
        GROUP BY fkUsuario;`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = ` SELECT nome as Nome, 
        ROUND(acertos)
AS Acertos, ROUND(erros) AS Erros FROM quiz1 join usuario on fkUsuario = usuario.id order by  fkUsuario desc limit 5;`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

function buscarMedidasEmTempoReal(idAquario) {
  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == 'producao') {
    instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`
  } else if (process.env.AMBIENTE_PROCESSO == 'desenvolvimento') {
    instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`
  } else {
    console.log(
      '\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n'
    )
    return
  }

  console.log('Executando a instrução SQL: \n' + instrucaoSql)
  return database.executar(instrucaoSql)
}

module.exports = {
  buscarUltimasMedidas,
  buscarUltimasMedidas2,
  buscarMedidasEmTempoReal
}
