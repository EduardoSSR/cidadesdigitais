//Carrega o modulo do mysql.
var mysql = require('mysql');

//Cria a conexão com o Banco de Dados.
var connectMYSQL = function(){
	return mysql.createConnection({
			host: '172.25.116.18',
			user: 'eduardo',
			password: 'eduardo',
			database: 'cidades_digitais_v10'
	});
}; 

//Retorna a conexão.
module.exports = function(){
	return connectMYSQL;
};