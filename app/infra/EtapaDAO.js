function EtapaDAO(connection){
	this._connection = connection;
}

//Lista todos os atributos da tabela de Etapa.
EtapaDAO.prototype.listarEtapa = function(callback){
	this._connection.query('SELECT * FROM etapa', callback);
}

//Salva uma nova tupla na tabela de Etapa.
EtapaDAO.prototype.salvarEtapa = function(etapa, callback){
	this._connection.query('INSERT INTO etapa SET ?', etapa, callback);
}

//Atualiza uma tupla da tabela de Etapa com base no ID.
EtapaDAO.prototype.editarEtapa = function(etapa, cod_etapa, callback){
	this._connection.query('UPDATE etapa SET ? WHERE cod_etapa = ? ', [etapa, cod_etapa], callback);
}

//Apaga uma tupla da tabela de Etapa com base no ID.
EtapaDAO.prototype.apagarEtapa = function(cod_etapa, callback){
	this._connection.query('DELETE FROM etapa where cod_etapa = ?', [cod_etapa], callback);
}

module.exports = function(){
	return EtapaDAO;
};