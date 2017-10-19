function PrefeitosDAO(connection){
	this._connection = connection;
}


//Lista todos os atributos da tabela de Prefeitos e trás junto o nome do Municipio.
PrefeitosDAO.prototype.listarPrefeitos = function(callback){
	this._connection.query('SELECT cod_prefeito, nome, cpf, partido, exercicio, nome_municipio FROM prefeitos INNER JOIN municipio ON prefeitos.municipio_cod_ibge = municipio.cod_ibge', callback);
}

//Salva uma nova tupla na tabela de Prefeitos.
PrefeitosDAO.prototype.salvarPrefeitos = function(prefeitos, callback){
	this._connection.query('INSERT INTO prefeitos SET ?', prefeitos, callback);
}


module.exports = function(){
	return PrefeitosDAO;
};