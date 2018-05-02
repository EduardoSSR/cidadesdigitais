function ContatoDAO(connection){
	this._connection = connection;
}


//---------------Querys de Contatos---------------//

//Lista tudo da tabela Contato.
ContatoDAO.prototype.listarContatoCnpj = function(cnpj, callback){
	this._connection.query('SELECT * FROM contato WHERE entidade_cnpj = ?', [cnpj], callback);
}

//Lista os Contato de uma Cidade Digital.
ContatoDAO.prototype.listarContatoCd = function(cod_ibge, callback){
	this._connection.query('SELECT contato.*, GROUP_CONCAT(telefone.contato_cod_contato) AS "contato_cod_contatos", GROUP_CONCAT(telefone.cod_telefone) AS "cod_telefones", GROUP_CONCAT(telefone.telefone) AS "num_telefones", GROUP_CONCAT(telefone.tipo) AS "tipo_telefones" FROM contato LEFT JOIN telefone ON contato.cod_contato = telefone.contato_cod_contato WHERE cd_municipio_cod_ibge = ? GROUP BY contato.cod_contato', [cod_ibge], callback);
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