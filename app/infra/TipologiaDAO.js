function TipologiaDAO(connection){
	this._connection = connection;
}


//Lista todos os atributos da tabela de Tipologia.
TipologiaDAO.prototype.listarTipologia = function(callback){
	this._connection.query('SELECT * FROM tipologia', callback);
}

//Salva uma nova tupla na tabela de Tipologia.
TipologiaDAO.prototype.salvarTipologia = function(tipologia, callback){
    this._connection.query('INSERT INTO tipologia SET ?', tipologia, callback);
}

//Atualiza uma tupla da tabela de Tipologia com base no ID.
TipologiaDAO.prototype.editarTipologia = function(tipologia, cod_tipologia, callback){
	this._connection.query('UPDATE tipologia SET ?  WHERE cod_tipologia = ?', [tipologia, cod_tipologia], callback);
}

//Apaga uma tupla da tabela de Tipologia com base no ID.
TipologiaDAO.prototype.apagarTipologia = function(id, callback){
    this._connection.query('DELETE FROM tipologia WHERE cod_tipologia = ?', [id], callback);
}



module.exports = function(){
	return TipologiaDAO;
};