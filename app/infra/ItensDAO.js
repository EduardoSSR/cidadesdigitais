function ItensDAO(connection){
	this._connection = connection;
}

//Lista todos os atributos da tabela Itens.
ItensDAO.prototype.listarItens = function(callback){
	this._connection.query('SELECT * FROM itens', callback);
}

module.exports = function(){
	return ItensDAO;
};