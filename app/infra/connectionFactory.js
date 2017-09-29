//Carrega o modulo do mysql.
var mysql = require('mysql');

//Cria a conexão com o Banco de Dados.
var connectMYSQL = function(){
	return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'cidades_digitais_v8'
	});
}; 

//Retorna a conexão.
module.exports = function(){
	return connectMYSQL;
};