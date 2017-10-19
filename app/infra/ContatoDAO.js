function ContatoDAO(connection){
	this._connection = connection;
}


//---------------Querys de Contatos---------------//

//Lista tudo da tabela Contato.
ContatoDAO.prototype.listarContato = function(callback){
	this._connection.query('SELECT * FROM contato', callback);
}

//Salva uma nova tupla na tabela de Contato.
ContatoDAO.prototype.salvarContato = function(contato, callback){
    this._connection.query('INSERT INTO contato SET ?', contato, callback);
}

//Atualiza uma tupla da tabela de Contato com base no ID.
ContatoDAO.prototype.editarContato = function(contato, cod_contato, callback){
	this._connection.query('UPDATE contato SET ?  WHERE cod_contato = ? ',[contato, cod_contato], callback);
}

//Apaga uma tupla da tabela de Contatos com base no ID.
ContatoDAO.prototype.apagarContato = function(id, callback){
    this._connection.query('DELETE FROM contato WHERE cod_contato = ?', [id], callback);
}





//---------------Querys de Telefones---------------//

//Lista tudo da tabela Telefone.
ContatoDAO.prototype.listarTelefone = function(callback){
	this._connection.query('SELECT * FROM telefone', callback);
}

//Salva uma nova tupla na tabela de Telefone.
ContatoDAO.prototype.salvarTelefone = function(telefone, callback){
	this._connection.query('INSERT INTO telefone SET ?', telefone , callback);
}

//Apaga uma tupla da tabela de Telefone com base no ID.
ContatoDAO.prototype.apagarTelefone = function(id, callback){
	this._connection.query('DELETE FROM telefone where cod_telefone = ?',[id], callback);
}


module.exports = function(){
	return ContatoDAO;
};