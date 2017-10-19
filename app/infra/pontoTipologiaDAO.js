function PontoTipologiaDAO(connection){
	this._connection = connection;
}


PontoTipologiaDAO.prototype.salvar = function(pontoTipologia, callback){
	this._connection.query('INSERT INTO ponto_tipologia SET ?', pontoTipologia, callback);
}

module.exports = function(){
	return PontoTipologiaDAO;
};