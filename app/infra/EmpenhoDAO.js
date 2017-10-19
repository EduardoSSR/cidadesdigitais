function EmpenhoDAO(connection){
	this._connection = connection;
}


//---------------Querys de Empenho---------------//

//Lista as informações de Empenho.
EmpenhoDAO.prototype.listarEmpenho = function(callback){
    this._connection.query('SELECT empenho.cod_empenho, empenho.data, previsao_empenho.lote_cod_lote, previsao_empenho.tipo, previsao_empenho.ano_referencia, natureza_despesa.descricao FROM empenho  INNER JOIN	previsao_empenho ON (empenho.previsao_empenho_cod_previsao_empenho = previsao_empenho.cod_previsao_empenho) INNER JOIN	natureza_despesa ON (previsao_empenho.natureza_despesa_cod_natureza_despesa = natureza_despesa.cod_natureza_despesa);', callback);
}

//Salva uma nova tupla na tabela de Empenho.
EmpenhoDAO.prototype.salvarEmpenho = function(empenho, callback){
    this._connection.query('INSERT INTO empenho SET ?', empenho, callback);
}

//Atualiza uma tupla da tabela de Empenho com base no ID.
EmpenhoDAO.prototype.editarEmpenho = function(empenho, id, callback){
    this._connection.query('UPDATE empenho SET ? WHERE cod_empenho = ?', [empenho, id], callback);
}

//Apaga uma tupla da tabela de Empenho com base no ID.
EmpenhoDAO.prototype.apagarEmpenho = function(id, callback){
    this._connection.query('DELETE FROM empenho WHERE cod_empenho = ?', [id], callback);
}





//---------------Querys de Empenho_Itens---------------//

//Lista tudo da tabela Empenho_Itens.
EmpenhoDAO.prototype.empenhoItens = function(codEmpenho, callback){
    this._connection.query('SELECT itens.cod_item, itens.tipo_item_cod_tipo_item, itens.descricao, itens.unidade, itens_empenho.valor, itens_empenho.quantidade FROM itens_empenho inner join itens on (itens_empenho.cod_item = itens.cod_item and itens_empenho.cod_tipo_item = itens.tipo_item_cod_tipo_item) where itens_empenho.cod_empenho = ?', [codEmpenho], callback);
}


module.exports = function(){
	return EmpenhoDAO;
};
