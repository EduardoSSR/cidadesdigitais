function TipologiaDAO(connection){
	this._connection = connection;
}


//Lista todos os atributos da tabela de Tipologia.
TipologiaDAO.prototype.listarTipologia = function(callback){
	this._connection.query('SELECT * FROM tipologia', callback);
}


module.exports = function(){
	return TipologiaDAO;
};