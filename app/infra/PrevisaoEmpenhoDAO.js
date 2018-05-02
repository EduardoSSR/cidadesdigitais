function PrevisaoEmpenhoDAO(connection){
	this._connection = connection;
}


//---------------Querys de Previsão Empenho---------------//

//Lista tudo da tabela Previsao_Empenho.
PrevisaoEmpenhoDAO.prototype.listarPrevisaoEmpenho = function(callback){
	this._connection.query('SELECT previsao_empenho.*, concat(natureza_despesa.cod_natureza_despesa, " - ", natureza_despesa.descricao) as descricao FROM previsao_empenho inner join natureza_despesa on (previsao_empenho.natureza_despesa_cod_natureza_despesa = natureza_despesa.cod_natureza_despesa)', callback);
}

//Salva uma nova tupla na tabela de Previsao_Empenho.
PrevisaoEmpenhoDAO.prototype.salvarPrevisaoEmpenho = function(previsaoEmpenho, callback){
    this._connection.query('INSERT INTO previsao_empenho SET ?', previsaoEmpenho, callback);
}

//Atualiza uma tupla da tabela de Previsao_Empenho com base no ID.
PrevisaoEmpenhoDAO.prototype.editarPrevisaoEmpenho = function(previsaoEmpenho, id, callback){
    this._connection.query('UPDATE previsao_empenho SET ? WHERE cod_previsao_empenho = ?', [previsaoEmpenho, id], callback);
}

//Apaga uma tupla da tabela de Previsao_Empenho com base no ID.
PrevisaoEmpenhoDAO.prototype.apagarPrevisaoEmpenho = function(id, callback){
    this._connection.query('DELETE FROM previsao_empenho WHERE cod_previsao_empenho = ?', [id], callback);
}




//---------------Querys de Itens---------------//

//.
PrevisaoEmpenhoDAO.prototype.listarPrevisaoEmpenhoItens = function(cod_lote, cod_lote, id, callback){
	this._connection.query('(SELECT itens.tipo_item_cod_tipo_item, itens.cod_item, CONCAT(itens.tipo_item_cod_tipo_item, ".", itens.cod_item, " - ", itens.descricao) AS descricao, itens_previsao_empenho.quantidade, itens_previsao_empenho.valor, tab3.quant_disponivel 	FROM itens, (select tab2.lote_itens_itens_tipo_item_cod_tipo_item, tab2.lote_itens_itens_cod_item, tab2.quantidade, tab2.valor, tab1.quant_lote - tab2.quant_previsao as quant_disponivel from (select *, sum(cd_itens.quantidade_previsto) as quant_lote from cd inner join cd_itens on (cd.municipio_cod_ibge = cd_itens.cd_municipio_cod_ibge) where cd.lote_cod_lote = ? group by cd_itens.itens_tipo_item_cod_tipo_item, cd_itens.itens_cod_item) as tab1, (select *, sum(itens_previsao_empenho.quantidade) as quant_previsao from itens_previsao_empenho where itens_previsao_empenho.lote_itens_lote_cod_lote = ? group by itens_previsao_empenho.lote_itens_itens_tipo_item_cod_tipo_item, itens_previsao_empenho.lote_itens_itens_cod_item) as tab2 where tab1.itens_tipo_item_cod_tipo_item = tab2.lote_itens_itens_tipo_item_cod_tipo_item and tab1.itens_cod_item = tab2.lote_itens_itens_cod_item) as tab3 inner join itens_previsao_empenho on (itens_previsao_empenho.previsao_empenho_cod_previsao_empenho = ? and itens_previsao_empenho.lote_itens_itens_tipo_item_cod_tipo_item = tab3.lote_itens_itens_tipo_item_cod_tipo_item and itens_previsao_empenho.lote_itens_itens_cod_item = tab3.lote_itens_itens_cod_item) WHERE tab3.lote_itens_itens_cod_item = itens.cod_item AND tab3.lote_itens_itens_tipo_item_cod_tipo_item = itens.tipo_item_cod_tipo_item order by itens.tipo_item_cod_tipo_item, itens.cod_item)', [cod_lote, cod_lote, id], callback);
}

//Atualiza uma tupla na tabela itens_empenho.
PrevisaoEmpenhoDAO.prototype.editarItens = function(cod_empenho, cod_item, cod_tipo_item, iPEmpenhoItens, callback){
    this._connection.query('UPDATE itens_previsao_empenho SET ? WHERE previsao_empenho_cod_previsao_empenho = ? AND lote_itens_itens_cod_item = ? AND lote_itens_itens_tipo_item_cod_tipo_item = ?', [iPEmpenhoItens, cod_empenho, cod_item, cod_tipo_item], callback);
}


module.exports = function(){
	return PrevisaoEmpenhoDAO;
};


/*


select *
from itens_previsao_empenho as a, 
	(SELECT itens.tipo_item_cod_tipo_item, itens.cod_item, CONCAT(itens.tipo_item_cod_tipo_item, ".", itens.cod_item, " - ", itens.descricao) AS descricao, tab3.quantidade, tab3.valor, tab3.quant_disponivel
	FROM itens, 
			(select tab2.lote_itens_itens_tipo_item_cod_tipo_item, tab2.lote_itens_itens_cod_item, tab2.quantidade, tab2.valor, tab1.quant_lote - tab2.quant_previsao as quant_disponivel
			from 
				(select *, sum(cd_itens.quantidade_previsto) as quant_lote
				from cd
				inner join cd_itens on (cd.municipio_cod_ibge = cd_itens.cd_municipio_cod_ibge)
				where cd.lote_cod_lote = 1
				group by cd_itens.itens_tipo_item_cod_tipo_item, cd_itens.itens_cod_item) 
				as tab1,
				(select *, sum(itens_previsao_empenho.quantidade) as quant_previsao
				from itens_previsao_empenho
				where itens_previsao_empenho.lote_itens_lote_cod_lote = 1
				group by itens_previsao_empenho.lote_itens_itens_tipo_item_cod_tipo_item, itens_previsao_empenho.lote_itens_itens_cod_item) 
				as tab2
			where tab1.itens_tipo_item_cod_tipo_item = tab2.lote_itens_itens_tipo_item_cod_tipo_item and tab1.itens_cod_item = tab2.lote_itens_itens_cod_item)
			as tab3
	inner join itens_previsao_empenho on (itens_previsao_empenho.previsao_empenho_cod_previsao_empenho = 6)
	WHERE tab3.lote_itens_itens_cod_item = itens.cod_item AND tab3.lote_itens_itens_tipo_item_cod_tipo_item = itens.tipo_item_cod_tipo_item
	group by itens.tipo_item_cod_tipo_item, itens.cod_item
	order by itens.tipo_item_cod_tipo_item, itens.cod_item)
    as tab4
where a.previsao_empenho_cod_previsao_empenho = 6 and a.lote_itens_itens_tipo_item_cod_tipo_item = tab4.tipo_item_cod_tipo_item and a. lote_itens_itens_cod_item = tab4.cod_item;





*/
