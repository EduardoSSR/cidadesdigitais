function PontoDAO(connection){
	this._connection = connection;
}

//Lista todos os atributos da tabela de Ponto.
PontoDAO.prototype.listar = function(callback){
	this._connection.query('SELECT * FROM ponto', callback);
}

//Salva uma nova tupla na tabela de Ponto.
PontoDAO.prototype.salvar = function(ponto, callback){
	this._connection.query('INSERT INTO ponto SET ?',ponto, callback);
}

//Salva uma nova tupla na tabela de Ponto_Tipologia.
PontoDAO.prototype.salvarPT = function(cod_tipologia, callback){
	this._connection.query('INSERT INTO ponto_tipologia SET ?', cod_tipologia, callback);
}

module.exports = function(){
	return PontoDAO;
};