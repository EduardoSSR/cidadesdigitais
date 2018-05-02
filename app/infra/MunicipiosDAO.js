function MunicipiosDAO(connection){
	this._connection = connection;
}


//Lista tudo da tabela Municipio.
MunicipiosDAO.prototype.listarMunicipio = function(callback){
	this._connection.query('SELECT * FROM municipio', callback);
}

//Lista os Municipio com base na UF.
MunicipiosDAO.prototype.listarMunicipioPorEstado = function(uf, callback){
	this._connection.query('SELECT * FROM municipio WHERE uf = ?', [uf], callback);
}

//Salva uma nova tupla na tabela de Municipio.
MunicipiosDAO.prototype.salvarMunicipio = function(municipio, callback){
	this._connection.query('INSERT INTO municipio SET ?', municipio, callback);
}

//Atualiza uma tupla da tabela de Municipio com base no ID.
MunicipiosDAO.prototype.editarMunicipio = function(municipio, id, callback){
    this._connection.query('UPDATE municipio SET ? WHERE cod_lote = ?', [municipio, id], callback);
}

//Apaga uma tupla da tabela de Municipio com base no ID.
MunicipiosDAO.prototype.apagarMunicipio = function(id, callback){
    this._connection.query('DELETE FROM municipio WHERE cod_lote = ?', [id], callback);
}


module.exports = function(){
	return MunicipiosDAO;
};
