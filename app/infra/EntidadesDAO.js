function EntidadesDAO(connection){
	this._connection = connection;
}

//Lista tudo da tabela Entidade.
EntidadesDAO.prototype.listar = function(callback){
	this._connection.query('SELECT * FROM entidade', callback);
}

//Salva uma nova tupla na tabela de Entidade.
EntidadesDAO.prototype.salvar = function(entidade, callback){
	this._connection.query('INSERT INTO entidade SET ?',entidade, callback);
}

//Atualiza uma tupla da tabela de Entidade com base no ID.
EntidadesDAO.prototype.editar = function(entidade, id, callback){
	this._connection.query('UPDATE entidade SET ?  WHERE cnpj = ? ',[entidade, id], callback);
}

//Apaga uma tupla da tabela de Enidade com base no ID.
EntidadesDAO.prototype.apagar = function(id, callback){
	this._connection.query('DELETE FROM entidade where cnpj = ?',[id], callback);
}

module.exports = function(){
	return EntidadesDAO;
};