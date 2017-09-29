function LoteDAO(connection){
	this._connection = connection;
}

//-----------Querys de Lote---------------//

//Lista as informações de todos os Lotes junto com todas as informações das Entidades relacionadas a este Lote.
LoteDAO.prototype.listarLote = function(callback){
	this._connection.query('SELECT * FROM lote INNER JOIN entidade ON lote.entidade_cnpj = entidade.cnpj', callback);
}

//Salva uma nova tupla na tabela de Lote.
LoteDAO.prototype.salvarLote = function(lotes, callback){
    this._connection.query('INSERT INTO lote SET ?', lotes, callback);
}

//Atualiza uma tupla da tabela de Lote com base no ID.
LoteDAO.prototype.editarLote = function(lotes, id, callback){
    this._connection.query('UPDATE lote SET ? WHERE cod_lote = ?', [lotes, id], callback);
}

//Apaga uma tupla da tabela de Lote com base no ID.
LoteDAO.prototype.apagarLote = function(id, callback){
    this._connection.query('DELETE FROM lote WHERE cod_lote = ?', [id], callback);
}




//-----------Querys de Reajuste---------------//

//Lista tudo da tabela Reajuste.
LoteDAO.prototype.listarReajuste = function(callback){
	this._connection.query('SELECT * FROM reajuste', callback);
}

//Salva uma nova tupla na tabela de Reajuste.
LoteDAO.prototype.salvarReajuste = function(reajuste, callback){
    this._connection.query('INSERT INTO reajuste SET ?', reajuste, callback);
}

//Apaga uma tupla da tabela de Reajuste com base no ID.
LoteDAO.prototype.apagarReajuste = function(lote_cod_lote, ano_ref, callback){
	this._connection.query('DELETE FROM reajuste WHERE lote_cod_lote = ? AND ano_ref = ?',[lote_cod_lote, ano_ref], callback);
}


module.exports = function(){
	return LoteDAO;
};
