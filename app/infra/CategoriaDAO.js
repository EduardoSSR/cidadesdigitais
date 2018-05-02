function CategoriaDAO(connection){
	this._connection = connection;
}


//Lista tudo da tabela Categoria.
CategoriaDAO.prototype.listarCategoria = function(callback){
	this._connection.query('SELECT * FROM categoria', callback);
}

//Salva uma nova tupla na tabela de Categoria.
CategoriaDAO.prototype.salvarCategoria = function(categoria, callback){
    this._connection.query('INSERT INTO categoria SET ?', categoria, callback);
}

//Atualiza uma tupla da tabela de Categoria com base no ID.
CategoriaDAO.prototype.editarCategoria = function(categoria, id, callback){
	this._connection.query('UPDATE categoria SET ? WHERE cod_categoria = ? ', [categoria, id], callback);
}

//Apaga uma tupla da tabela de Categoria com base no ID.
CategoriaDAO.prototype.apagarCategoria = function(id, callback){
    this._connection.query('DELETE FROM categoria WHERE cod_categoria = ?', [id], callback);
}


module.exports = function(){
	return CategoriaDAO;
};