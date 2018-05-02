function TipoItemDAO(connection){
	this._connection = connection;
}

//Lista todos os atributos da tabela de Tipo_item.
TipoItemDAO.prototype.listarTipoItem = function(callback){
	this._connection.query('SELECT * FROM tipo_item', callback);
}

//Salva uma nova tupla na tabela de Tipo_item.
TipoItemDAO.prototype.salvarTipoItem = function(tipoItem, callback){
	this._connection.query('INSERT INTO tipo_item SET ?', tipoItem, callback);
}

//Atualiza uma tupla da tabela de Tipo_item com base no ID.
TipoItemDAO.prototype.editarTipoItem = function(tipoItem, cod_tipo_item, callback){
	this._connection.query('UPDATE tipo_item SET ? WHERE cod_tipo_item = ? ', [tipoItem, cod_tipo_item], callback);
}

//Apaga uma tupla da tabela de Tipo_item com base no ID.
TipoItemDAO.prototype.apagarTipoItem = function(cod_tipo_item, callback){
	this._connection.query('DELETE FROM tipo_item where cod_tipo_item = ?', [cod_tipo_item], callback);
}

module.exports = function(){
	return TipoItemDAO;
};