function AssuntoDAO(connection){
	this._connection = connection;
}


//Lista tudo da tabela Assunto.
AssuntoDAO.prototype.listarAssunto = function(callback){
	this._connection.query('SELECT * FROM assunto', callback);
}

//Salva uma nova tupla na tabela de Assunto.
AssuntoDAO.prototype.salvarAssunto = function(assunto, callback){
	this._connection.query('INSERT INTO assunto SET ?', assunto, callback);
}

//Atualiza uma tupla da tabela de Assunto com base no ID.
AssuntoDAO.prototype.editarAssunto = function(assunto, id, callback){
    this._connection.query('UPDATE assunto SET ? WHERE cod_lote = ?', [assunto, id], callback);
}

//Apaga uma tupla da tabela de Assunto com base no ID.
AssuntoDAO.prototype.apagarAssunto = function(id, callback){
    this._connection.query('DELETE FROM assunto WHERE cod_lote = ?', [id], callback);
}


module.exports = function(){
	return AssuntoDAO;
};