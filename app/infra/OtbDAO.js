function OtbDAO(connection){
	this._connection = connection;
}


//Lista tudo da tabela Otb (Pagamento).
OtbDAO.prototype.listarPagamento = function(callback){
	this._connection.query('SELECT * FROM otb', callback);
}

//Salva uma nova tupla na tabela de Otb (Pagamento).
OtbDAO.prototype.salvarPagamento = function(otb, callback){
    this._connection.query('INSERT INTO otb SET ?', otb, callback);
}

//Salva uma nova tupla na tabela de Otb_Fatura (Pagamento).
OtbDAO.prototype.salvarOtbFatura = function(fatura_otb, callback){
    this._connection.query('INSERT INTO fatura_otb SET ?', fatura_otb, callback);
}

//Atualiza uma tupla da tabela de Otb (Pagamento) com base no ID.
OtbDAO.prototype.editarPagamento = function(otb, id, callback){
    this._connection.query('UPDATE otb SET ? WHERE cod_otb = ?', [otb, id], callback);
}

//Apaga uma tupla da tabela de Otb (Pagamento) com base no ID.
OtbDAO.prototype.apagarPagamento = function(id, callback){
    this._connection.query('DELETE FROM otb WHERE cod_otb = ?', [id], callback);
}



//---------------Querys de Fatura---------------//

//.
OtbDAO.prototype.listarPagFatura = function(cod_otb, callback){
	this._connection.query('select otb.cod_otb, fatura.*, municipio.nome_municipio from otb inner join fatura_otb on otb.cod_otb = fatura_otb.otb_cod_otb inner join fatura on fatura_otb.fatura_num_nf = fatura.num_nf and fatura_otb.fatura_cd_municipio_cod_ibge = fatura.cd_municipio_cod_ibge inner join municipio on fatura.cd_municipio_cod_ibge = municipio.cod_ibge where otb.cod_otb = ?', [cod_otb], callback);
}

//.
OtbDAO.prototype.listarMuniFatura = function(cd_municipio_cod_ibge, callback){
	this._connection.query('select fatura.*, municipio.nome_municipio from fatura inner join municipio on fatura.cd_municipio_cod_ibge = municipio.cod_ibge where cd_municipio_cod_ibge = ?', [cd_municipio_cod_ibge], callback);
}



//---------------Querys de Itens---------------//

OtbDAO.prototype.listarItens = function(cod_otb, callback){
	this._connection.query('SELECT itens_otb.otb_cod_otb, itens_otb.itens_fatura_fatura_num_nf, itens.tipo_item_cod_tipo_item, itens.cod_item, concat(itens.tipo_item_cod_tipo_item, ".", itens.cod_item," - ", itens.descricao) as descricao_item, itens.unidade, itens_otb.cod_empenho, concat(natureza_despesa.cod_natureza_despesa, " - ", natureza_despesa.descricao) as descricao, itens_otb.quantidade, itens_otb.valor, tab3.quant_disponivel FROM itens, natureza_despesa, (select tab2.*, tab1.quantidade - tab2.quant_otb as quant_disponivel from (select itens_fatura.* from fatura_otb inner join itens_fatura on (fatura_otb.fatura_num_nf = itens_fatura.fatura_num_nf and fatura_otb.fatura_cd_municipio_cod_ibge = itens_fatura.cod_ibge) where fatura_otb.otb_cod_otb = ?) as tab1, (select itens_otb.*, sum(itens_otb.quantidade) as quant_otb from fatura_otb inner join itens_otb on (fatura_otb.fatura_num_nf = itens_otb.itens_fatura_fatura_num_nf and fatura_otb.fatura_cd_municipio_cod_ibge = itens_otb.itens_fatura_cod_ibge) -- pode precisar colocar o cod_otb where fatura_otb.otb_cod_otb = ? group by itens_otb.cod_tipo_item, itens_otb.cod_item, itens_otb.itens_fatura_fatura_num_nf, itens_otb.itens_fatura_cod_ibge, itens_otb.cod_empenho) as tab2 where tab1.cod_tipo_item = tab2.cod_tipo_item and tab1.cod_item = tab2.cod_item and tab1.fatura_num_nf = tab2.itens_fatura_fatura_num_nf and tab1.cod_ibge = tab2.itens_fatura_cod_ibge and tab1.cod_empenho = tab2.cod_empenho) as tab3 inner join itens_otb on (itens_otb.otb_cod_otb = ? and itens_otb.cod_tipo_item = tab3.cod_tipo_item and itens_otb.cod_item = tab3.cod_item and itens_otb.itens_fatura_fatura_num_nf = tab3.itens_fatura_fatura_num_nf and itens_otb.itens_fatura_cod_ibge = tab3.itens_fatura_cod_ibge and itens_otb.cod_empenho = tab3.cod_empenho) WHERE tab3.cod_item = itens.cod_item AND tab3.cod_tipo_item = itens.tipo_item_cod_tipo_item and itens.natureza_despesa_cod_natureza_despesa = natureza_despesa.cod_natureza_despesa order by itens.tipo_item_cod_tipo_item, itens.cod_item, itens_otb.itens_fatura_fatura_num_nf, itens_otb.cod_empenho', [cod_otb, cod_otb, cod_otb], callback);
}

OtbDAO.prototype.editarItens = function(otbItens, otb_cod_otb, itens_fatura_fatura_num_nf, cod_item, cod_tipo_item, callback){
	this._connection.query('UPDATE itens_otb SET ? WHERE otb_cod_otb = ? AND itens_fatura_fatura_num_nf = ? AND cod_item = ? AND cod_tipo_item = ?',[otbItens, otb_cod_otb, itens_fatura_fatura_num_nf, cod_item, cod_tipo_item], callback);
}


module.exports = function(){
	return OtbDAO;
};