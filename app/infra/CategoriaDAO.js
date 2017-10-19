function CategoriaDAO(connection){
	this._connection = connection;
}


//Lista tudo da tabela Categoria.
CategoriaDAO.prototype.listarCategoria = function(callback){
	this._connection.query('SELECT * FROM categoria', callback);
}


module.exports = function(){
	return CategoriaDAO;
};