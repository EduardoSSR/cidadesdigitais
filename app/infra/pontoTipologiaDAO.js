function PontoTipologiaDAO(connection){
	this._connection = connection;
}

//Salva uma nova tupla na tabela de Usuario.
PontoTipologiaDAO.prototype.salvar = function(pontoTipologia, callback){
	this._connection.query('INSERT INTO ponto_tipologia SET ?', pontoTipologia, callback);
}

module.exports = function(){
	return PontoTipologiaDAO;
};