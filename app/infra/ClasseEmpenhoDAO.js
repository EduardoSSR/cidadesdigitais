function ClasseEmpenhoDAO(connection){
	this._connection = connection;
}


//Lista todos os atributos da tabela de Classe_Empenho.
ClasseEmpenhoDAO.prototype.listarClasseEmpenho = function(callback){
	this._connection.query('SELECT * FROM classe_empenho', callback);
}

//Salva uma nova tupla na tabela de Classe_Empenho.
ClasseEmpenhoDAO.prototype.salvarClasseEmpenho = function(classeEmpenho, callback){
	this._connection.query('INSERT INTO classe_empenho SET ?', classeEmpenho, callback);
}

//Atualiza uma tupla da tabela de Classe_Empenho com base no ID.
ClasseEmpenhoDAO.prototype.editarClasseEmpenho = function(classeEmpenho, id, callback){
	this._connection.query('UPDATE classe_empenho SET ? WHERE cod_classe_empenho = ? ',[classeEmpenho, id], callback);
}

//Apaga uma tupla da tabela de Classe_Empenho com base no ID.
ClasseEmpenhoDAO.prototype.apagarClasseEmpenho = function(id, callback){
	this._connection.query('DELETE FROM classe_empenho where cod_classe_empenho = ?',[id], callback);
}


module.exports = function(){
	return ClasseEmpenhoDAO;
};