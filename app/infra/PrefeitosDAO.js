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

//Atualiza uma tupla da tabela de Prefeitos com base no ID.
PrefeitosDAO.prototype.editarPrefeitos = function(prefeito, cod_prefeito, callback){
    this._connection.query('UPDATE prefeitos SET ? WHERE cod_prefeito = ?', [prefeito, cod_prefeito], callback);
}

//Apaga uma tupla da tabela de Prefeitos com base no ID.
PrefeitosDAO.prototype.apagarPrefeitos = function(id, callback){
    this._connection.query('DELETE FROM prefeitos WHERE cod_prefeito = ?', [id], callback);
}


module.exports = function(){
	return PrefeitosDAO;
};