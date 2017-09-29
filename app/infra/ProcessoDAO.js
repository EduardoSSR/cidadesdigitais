function ProcessoDAO(connection){
	this._connection = connection;
}

//Lista todos os atributos da tabela de Processo.
ProcessoDAO.prototype.listar = function(callback){
	this._connection.query('SELECT * FROM processo', callback);
}

module.exports = function(){
	return ProcessoDAO;
};