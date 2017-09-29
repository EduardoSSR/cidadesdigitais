function OtbDAO(connection){
	this._connection = connection;
}

//Lista tudo da tabela Otb (Pagamento).
OtbDAO.prototype.listar = function(callback){
	this._connection.query('SELECT * FROM otb', callback);
}

//Salva uma nova tupla na tabela de Otb (Pagamento).
OtbDAO.prototype.salvar = function(otb, callback){
    this._connection.query('INSERT INTO otb SET ?', otb, callback);
}

//Atualiza uma tupla da tabela de Otb (Pagamento) com base no ID.
OtbDAO.prototype.editar = function(otb, id, callback){
    this._connection.query('UPDATE otb SET ? WHERE cod_otb = ?', [otb, id], callback);
}

//Apaga uma tupla da tabela de Otb (Pagamento) com base no ID.
OtbDAO.prototype.apagar = function(id, callback){
    this._connection.query('DELETE FROM otb WHERE cod_otb = ?', [id], callback);
}

module.exports = function(){
	return OtbDAO;
};