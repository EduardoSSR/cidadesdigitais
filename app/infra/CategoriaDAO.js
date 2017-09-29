function CategoriaDAO(connection){
	this._connection = connection;
}


CategoriaDAO.prototype.listar = function(callback){
	this._connection.query('SELECT * FROM categoria', callback);
}

module.exports = function(){
	return CategoriaDAO;
};