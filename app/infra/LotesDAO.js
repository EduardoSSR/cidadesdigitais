function LoteDAO(connection){
	this._connection = connection;
}

//---------------Querys de Lote---------------//

//Lista as informações de todos os Lotes junto com todas as informações das Entidades relacionadas ao Lote.
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




//---------------Querys de Reajuste---------------//

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




//---------------Querys de Itens---------------//

//Lista tudo da tabela Lote_Itens.
LoteDAO.prototype.listarItens = function(lote_cod_lote, callback){
	this._connection.query('SELECT lote_itens.lote_cod_lote, lote_itens.itens_cod_item, lote_itens.itens_tipo_item_cod_tipo_item, concat(lote_itens.itens_tipo_item_cod_tipo_item, ".", lote_itens.itens_cod_item, " - ", itens.descricao) as descricao_item, lote_itens.preco FROM lote_itens INNER JOIN itens ON (lote_itens.itens_cod_item = itens.cod_item AND lote_itens.itens_tipo_item_cod_tipo_item = itens.tipo_item_cod_tipo_item) WHERE lote_itens.lote_cod_lote = ? order by lote_itens.itens_tipo_item_cod_tipo_item, lote_itens.itens_cod_item', [lote_cod_lote], callback);
}

//Atualiza uma tupla da tabela de .
LoteDAO.prototype.editarItens = function(lote_cod_lote, itens_cod_item, itens_tipo_item_cod_tipo_item, loteItens, callback){
	this._connection.query('UPDATE lote_itens SET ? WHERE lote_cod_lote = ? AND itens_cod_item = ? AND itens_tipo_item_cod_tipo_item = ?',[loteItens, lote_cod_lote, itens_cod_item, itens_tipo_item_cod_tipo_item], callback);
}




//---------------Querys de Itens---------------//

//Lista tudo de previsao empenho. 
LoteDAO.prototype.listarPrevisao = function(callback){
	this._connection.query('SELECT * FROM previsao_empenho', callback);
}

//Salva uma nova tupla na tabela de Reajuste.
LoteDAO.prototype.salvarPrevisao = function(previsao, callback){
    this._connection.query('INSERT INTO previsao_empenho SET ?', previsao, callback);
}

module.exports = function(){
	return LoteDAO;
};
