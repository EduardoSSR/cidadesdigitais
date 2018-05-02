function EmpenhoDAO(connection){
	this._connection = connection;
}


//---------------Querys de Empenho---------------//

//Lista o codigo de empenho, a data, o cod_lote de previsão empenho, seu tipo o ano de referencia, concatena a natureza de despesa e sua descrição, além do codigo de perevisão empenho da tabela empenho onde seu codigo é igual a previsão empenho e previsao empenho é igual a natureza despesa.
EmpenhoDAO.prototype.listarEmpenho = function(callback){
    this._connection.query('SELECT empenho.cod_empenho, empenho.data, previsao_empenho.lote_cod_lote, previsao_empenho.tipo, previsao_empenho.ano_referencia, concat(natureza_despesa.cod_natureza_despesa, " - ", natureza_despesa.descricao) as descricao, empenho.previsao_empenho_cod_previsao_empenho FROM empenho  INNER JOIN	previsao_empenho ON (empenho.previsao_empenho_cod_previsao_empenho = previsao_empenho.cod_previsao_empenho) INNER JOIN	natureza_despesa ON (previsao_empenho.natureza_despesa_cod_natureza_despesa = natureza_despesa.cod_natureza_despesa)', callback);
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

//Lista tudo da tabela Empenho_Itens, concatena o cod do item, o codigo do tipo do item e sua descrição e a unidade do item, onde o codigo do item da tabela seja igual ao de itens e de itens seja igual ao do tipo do item de acordo com o codigo do empenho passado.
EmpenhoDAO.prototype.empenhoItens = function(cod_lote, cod_lote, cod_empenho, callback){
    this._connection.query('SELECT itens.cod_item, itens.tipo_item_cod_tipo_item, CONCAT(itens.tipo_item_cod_tipo_item, ".", itens.cod_item, " - ", itens.descricao) AS descricao_item, itens.unidade, itens_empenho.quantidade, itens_empenho.valor, tab3.quant_disponivel FROM itens, (select tab2.*, tab1.quant_previsao - tab2.quant_empenho as quant_disponivel from (select *, sum(itens_previsao_empenho.quantidade) as quant_previsao from itens_previsao_empenho where itens_previsao_empenho.lote_itens_lote_cod_lote = ? group by itens_previsao_empenho.lote_itens_itens_tipo_item_cod_tipo_item, itens_previsao_empenho.lote_itens_itens_cod_item) as tab1, (select itens_empenho.*, sum(itens_empenho.quantidade) as quant_empenho from previsao_empenho inner join itens_empenho on (previsao_empenho.cod_previsao_empenho = itens_empenho.cod_previsao_empenho) where previsao_empenho.lote_cod_lote = ? group by itens_empenho.cod_tipo_item, itens_empenho.cod_item) as tab2 where tab1.lote_itens_itens_tipo_item_cod_tipo_item = tab2.cod_tipo_item and tab1.lote_itens_itens_cod_item = tab2.cod_item) as tab3 inner join itens_empenho on (itens_empenho.cod_empenho = ? and itens_empenho.cod_tipo_item = tab3.cod_tipo_item and itens_empenho.cod_item = tab3.cod_item) WHERE tab3.cod_item = itens.cod_item AND tab3.cod_tipo_item = itens.tipo_item_cod_tipo_item order by itens.tipo_item_cod_tipo_item, itens.cod_item', [cod_lote, cod_lote, cod_empenho], callback);
}

//Atualiza uma tupla da tabela de Empenho_Itens com base no ID.
EmpenhoDAO.prototype.editarItens = function(itens_empenho, cod_empenho, cod_item, cod_tipo_item, callback){
	this._connection.query('UPDATE itens_empenho SET ? WHERE cod_empenho = ? AND cod_item = ? AND cod_tipo_item = ?', [itens_empenho, cod_empenho, cod_item, cod_tipo_item], callback);
}


module.exports = function(){
	return EmpenhoDAO;
};
