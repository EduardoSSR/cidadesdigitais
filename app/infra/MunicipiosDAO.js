function MunicipiosDAO(connection){
	this._connection = connection;
}

//Lista tudo da tabela Minicipio.
MunicipiosDAO.prototype.listar = function(callback){
	this._connection.query('SELECT * FROM municipio', callback);
}

//Salva uma nova tupla na tabela de Minicipio.
MunicipiosDAO.prototype.salvar = function(municipio, callback){
	this._connection.query('INSERT INTO municipio SET ?', municipio, callback);
}

//Atualiza uma tupla da tabela de Minicipio com base no ID.
MunicipiosDAO.prototype.editar = function(municipio, id, callback){
    this._connection.query('UPDATE municipio SET ? WHERE cod_lote = ?', [municipio, id], callback);
}

//Apaga uma tupla da tabela de Minicipio com base no ID.
MunicipiosDAO.prototype.apagar = function(id, callback){
    this._connection.query('DELETE FROM municipio WHERE cod_lote = ?', [id], callback);
}

module.exports = function(){
	return MunicipiosDAO;
};
