function FaturaDAO(connection){
	this._connection = connection;
}

//Lista tudo de fatura e concatena o nome do municipio com sua uf em que o codigo ibge da fatura é igual ao codigo ibge do municipio.
FaturaDAO.prototype.listarFatura = function(callback){
	this._connection.query('SELECT fatura.*, concat(municipio.nome_municipio, " - ", municipio.uf) as nome_municipio from fatura inner join municipio on (fatura.cd_municipio_cod_ibge = municipio.cod_ibge) where fatura.cd_municipio_cod_ibge = municipio.cod_ibge', callback);
}
//lista a soma de todas as linhas de valor e quantidade que foram multiplicadas e as exibe como total da tabela itens_fatura onde o numero da fatura é iqual ao informado.
FaturaDAO.prototype.totalFatura = function(num_nf, callback){
	this._connection.query('select sum(valor * quantidade) as total from itens_fatura where fatura_num_nf = ?', [num_nf], callback);
}

//Salva uma nova tupla na tabela de Fatura.
FaturaDAO.prototype.salvarFatura = function(fatura, callback){
    this._connection.query('INSERT INTO fatura SET ?', fatura, callback);
}

//Atualiza uma tupla da tabela de Fatura com base no ID.
FaturaDAO.prototype.editarFatura = function(fatura, id, callback){
    this._connection.query('UPDATE fatura SET ? WHERE num_nf = ?', [fatura], callback);
}

//Apaga uma tupla da tabela de Fatura com base no ID.
FaturaDAO.prototype.apagarFatura = function(id, callback){
    this._connection.query('DELETE FROM fatura WHERE num_nf = ?', [id], callback);
}



//---------------Querys de Itens_Fatura---------------//

//lista numero da fatura, cod do item, do tipo do item e cod do empenho, quatidade e valor da tabela fatura e concatena tipo do item, cod do item e sua descrição da tabela itens, também concatena o codigo da natureza despeza com a descrição da natureza, sendo o codigo de itens fatura sendo igual ao de itens e tipo item de itens fatura igual ao de tipo item de itens, onde o numero da fatura de itens fatura é igual ao enviado.  
FaturaDAO.prototype.listarItensFatura = function(num_nf, callback){
    this._connection.query('select itens_fatura.fatura_num_nf, itens_fatura.cod_item, itens_fatura.cod_tipo_item, concat(itens.tipo_item_cod_tipo_item, ".", itens.cod_item," - ", itens.descricao) as descricao_item, itens_fatura.cod_empenho, concat(natureza_despesa.cod_natureza_despesa, " - ", natureza_despesa.descricao) as descricao, itens_fatura.quantidade, itens_fatura.valor from itens_fatura inner join itens on (itens_fatura.cod_item = itens.cod_item and itens_fatura.cod_tipo_item = itens.tipo_item_cod_tipo_item) inner join natureza_despesa on (itens.natureza_despesa_cod_natureza_despesa = natureza_despesa.cod_natureza_despesa) where itens_fatura.fatura_num_nf = ?', [num_nf],callback);
}

//Lista o codigo do empenho, o valor e a quantidade dos itens de acordo com a cidade, natureza depesa, codigo do item e seu tipo.
FaturaDAO.prototype.listarEmpenho = function(cod_ibge, cod_natureza_despesa, cod_item, cod_tipo_item, callback){
	this._connection.query('select empenho.cod_empenho, itens_empenho.valor, itens_empenho.quantidade from cd inner join lote on (cd.lote_cod_lote = lote.cod_lote) inner join previsao_empenho on (lote.cod_lote = previsao_empenho.lote_cod_lote) inner join empenho on (previsao_empenho.cod_previsao_empenho = empenho.previsao_empenho_cod_previsao_empenho) inner join itens_empenho on (empenho.cod_empenho = itens_empenho.cod_empenho) where cd.municipio_cod_ibge = ? and previsao_empenho.natureza_despesa_cod_natureza_despesa = ? and itens_empenho.cod_item = ? and itens_empenho.cod_tipo_item = ?', [cod_ibge, cod_natureza_despesa, cod_item, cod_tipo_item], callback);
}

//salva uma nova tupla na tabela itens_fatura
FaturaDAO.prototype.salvarItensFatura = function(itens_fatura, callback){
    this._connection.query('INSERT INTO itens_fatura SET ?', itens_fatura, callback);
}

//Atualiza uma tupla da tabela de Itens_Fatura com base nos IDs.
FaturaDAO.prototype.editarItensFatura = function(itens_fatura, fatura_num_nf, cod_empenho, cod_item, cod_tipo_item, callback){
    this._connection.query('UPDATE itens_fatura SET ? WHERE fatura_num_nf = ? AND cod_empenho = ? AND cod_item = ? AND cod_tipo_item = ?', [itens_fatura, fatura_num_nf, cod_empenho, cod_item, cod_tipo_item], callback);
}

//Apaga uma tupla da tabela de Itens_Fatura com base nos IDs.
FaturaDAO.prototype.apagarItensFatura = function(fatura_num_nf, cod_empenho, cod_item, cod_tipo_item, callback){
    this._connection.query('DELETE FROM itens_fatura WHERE fatura_num_nf = ? AND cod_empenho = ? AND cod_item = ? AND cod_tipo_item = ?', [fatura_num_nf, cod_empenho, cod_item, cod_tipo_item], callback);
}


//---------------Querys de Fatura_otb---------------//

//Lista o cod di pagamento junto da data da tabela fatura_otb onde o numero da fatura e o cod_ibge sejam iguais ao enviado. 
FaturaDAO.prototype.listarOtb = function(num_nf, cod_ibge, callback){
	this._connection.query('SELECT otb.cod_otb, otb.dt_pgto FROM fatura_otb INNER JOIN otb ON fatura_otb.otb_cod_otb = otb.cod_otb WHERE fatura_otb.fatura_num_nf = ? AND fatura_otb.fatura_cd_municipio_cod_ibge = ?', [num_nf, cod_ibge], callback);
}

module.exports = function(){
	return FaturaDAO;
};