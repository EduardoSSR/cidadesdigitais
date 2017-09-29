function ContatoDAO(connection){
	this._connection = connection;
}

//-----------Querys de Contato---------------//

//Lista tudo da tabela Contato.
ContatoDAO.prototype.listarContato = function(callback){
	this._connection.query('SELECT * FROM contato', callback);
}

//Salva uma nova tupla na tabela de Contato.
ContatoDAO.prototype.salvarContato = function(contato, callback){
    this._connection.query('INSERT INTO contato SET ?', contato, callback);
}

//Apaga uma tupla da tabela de Contatos com base no ID.
ContatoDAO.prototype.apagarContato = function(id, callback){
    this._connection.query('DELETE FROM contato WHERE cod_contato = ?', [id], callback);
}




//-----------Querys de Telefone---------------//

//Lista tudo da tabela Telefone.
ContatoDAO.prototype.listarTelefone = function(callback){
	this._connection.query('SELECT * FROM telefone', callback);
}


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