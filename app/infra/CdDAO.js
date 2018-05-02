function CdDAO(connection){
	this._connection = connection;
}


//---------------Querys de Municipios---------------//

//lista todos os municipios e seus respectivos codigos ibge de acordo com a uf recebida.
CdDAO.prototype.listarMunicipios = function(uf, callback){
	this._connection.query('select cod_ibge, nome_municipio from municipio where uf = ?', [uf] ,callback);
}




//---------------Querys de Cidades Digitais---------------//

//Lista tudo da tabela CD junto com o nome e a uf do respectivo municipio.
CdDAO.prototype.listarCidadesDigitais = function(callback){
	this._connection.query('SELECT cd.*, concat(municipio.nome_municipio, " - ", municipio.uf) as nome_municipio, uf FROM cd INNER JOIN municipio ON cd.municipio_cod_ibge = municipio.cod_ibge', callback);
}

//Salva uma nova tupla na tabela de CD.
CdDAO.prototype.salvarCidadesDigitais = function(cd, callback){
	this._connection.query('INSERT INTO cd SET ?', cd, callback);
}

//Atualiza uma tupla da tabela de cd com base no codígo ibge.
CdDAO.prototype.editarCidadesDigitais = function(cd, cod_ibge, callback){
    this._connection.query('UPDATE cd SET ? WHERE municipio_cod_ibge = ?', [cd, cod_ibge], callback);
}

//Apaga uma tupla da tabela de cd com base no ID.
CdDAO.prototype.apagarCidadesDigitais = function(id, callback){
	this._connection.query('DELETE FROM cd WHERE municipio_cod_ibge = ?',[id], callback);
}




//---------------Querys de Itens---------------//

//lista todos os itens do Cd, exibindo o codigo do item, seu tipo de item e sua descrição juntas,comparando com os itens das tabelas itens, cd e lote_itens.
CdDAO.prototype.listarItens = function(cod_ibge, callback){
	this._connection.query('select distinct cd_itens.itens_cod_item, cd_itens.itens_tipo_item_cod_tipo_item, CONCAT(cd_itens.itens_tipo_item_cod_tipo_item, ".", cd_itens.itens_cod_item, " - ", itens.descricao) AS descricao_item ,cd_itens.quantidade_previsto, cd_itens.quantidade_projeto_executivo, cd_itens.quantidade_termo_instalacao, lote_itens.preco from cd_itens inner join itens on (cd_itens.itens_cod_item = itens.cod_item and cd_itens.itens_tipo_item_cod_tipo_item = itens.tipo_item_cod_tipo_item) inner join cd on (cd_itens.cd_municipio_cod_ibge = cd.municipio_cod_ibge) inner join lote_itens on (cd_itens.itens_cod_item = lote_itens.itens_cod_item and cd_itens.itens_tipo_item_cod_tipo_item = lote_itens.itens_tipo_item_cod_tipo_item and cd.lote_cod_lote = lote_itens.lote_cod_lote) where cd_itens.cd_municipio_cod_ibge = ? order by cd_itens.itens_tipo_item_cod_tipo_item, cd_itens.itens_cod_item', [cod_ibge] ,callback);
}

//Atualiza uma tupla da tabela de Cd com base no codigo do municipio, item e o tipo do item.
CdDAO.prototype.editarItens = function(cdItem, cod_ibge, cod_itens, cod_tipo_item, callback){
    this._connection.query('UPDATE cd_itens SET ? WHERE cd_municipio_cod_ibge = ? AND itens_cod_item = ? AND itens_tipo_item_cod_tipo_item = ?', [cdItem, cod_ibge, cod_itens, cod_tipo_item], callback);
}




//---------------Querys de Processo---------------//

//Lista todos os atributos da tabela de Processo.
CdDAO.prototype.listarProcesso = function(cod_ibge, callback){
	this._connection.query('SELECT * FROM processo WHERE cd_municipio_cod_ibge = ?', [cod_ibge], callback);
}

//Salva uma nova tupla na tabela de Processo.
CdDAO.prototype.salvarProcesso = function(processo, callback){
	this._connection.query('INSERT INTO processo SET ?', processo, callback);
}

//Atualiza uma tupla da tabela de Processo com base nos IDs.
CdDAO.prototype.editarProcesso = function(processo, cod_processo, cd_municipio_cod_ibge, callback){
	this._connection.query('UPDATE processo SET ?  WHERE cod_processo = ? AND cd_municipio_cod_ibge = ?', [processo, cod_processo, cd_municipio_cod_ibge], callback);
}

//Apaga uma tupla da tabela de Processo com base nos IDs.
CdDAO.prototype.apagarProcesso = function(cod_processo, cd_municipio_cod_ibge, callback){
	this._connection.query('DELETE FROM processo WHERE cod_processo = ? AND cd_municipio_cod_ibge = ?', [cod_processo, cd_municipio_cod_ibge], callback);
}




//---------------Querys de Acompanhamento---------------//

//Lista todos os atributos das tabelas Uacom e Assunto de acordo com o seu relacionamento
CdDAO.prototype.listarAcompanhamento = function(cod_ibge, callback){
	this._connection.query('SELECT uacom.*, assunto.* FROM uacom LEFT JOIN uacom_assunto ON uacom.cd_municipio_cod_ibge = uacom_assunto.uacom_cd_municipio_cod_ibge AND uacom.data = uacom_assunto.uacom_data LEFT JOIN assunto ON uacom_assunto.assunto_cod_assunto = assunto.cod_assunto WHERE uacom.cd_municipio_cod_ibge = ? ORDER BY uacom.cd_municipio_cod_ibge, uacom.data', [cod_ibge], callback);
}

//Lista todos os atributos das tabelas Uacom e Assunto de acordo com o seu relacionamento com base nos IDs de Uacom
CdDAO.prototype.listarUacomAssun = function(cd_municipio_cod_ibge, data, callback){
	this._connection.query('SELECT uacom.*, assunto.* FROM uacom INNER JOIN uacom_assunto ON uacom.cd_municipio_cod_ibge = uacom_assunto.uacom_cd_municipio_cod_ibge AND uacom.data = uacom_assunto.uacom_data INNER JOIN assunto ON uacom_assunto.assunto_cod_assunto = assunto.cod_assunto WHERE uacom.cd_municipio_cod_ibge = ? AND uacom.data = ? ORDER BY uacom.cd_municipio_cod_ibge, uacom.data', [cd_municipio_cod_ibge, data], callback);
}

//Salva uma nova tupla na tabela de Uacom (Acompanhamento).
CdDAO.prototype.salvarAcompanhamento = function(uacom, callback){
	this._connection.query('INSERT INTO uacom SET ?', uacom, callback);
}

//Salva uma nova tupla na tabela de Uacom_Assunto.
CdDAO.prototype.salvarUacomAssun = function(uacom_assunto, callback){
	this._connection.query('INSERT INTO uacom_assunto SET ?', uacom_assunto, callback);
}




//---------------Querys de Ponto---------------//

//Lista todos os atributos da tabela de Ponto.
CdDAO.prototype.listarPonto = function(cod_ibge, callback){
	this._connection.query('select ponto.* , tipologia.*, categoria.descricao as "descricao_categoria" from ponto left join ponto_tipologia on ponto.cod_ponto = ponto_tipologia.ponto_cod_ponto and ponto.categoria_cod_categoria = ponto_tipologia.ponto_categoria_cod_categoria and ponto.cd_municipio_cod_ibge = ponto_tipologia.ponto_cd_municipio_cod_ibge left join tipologia on ponto_tipologia.tipologia_cod_tipologia = tipologia.cod_tipologia left join categoria on ponto.categoria_cod_categoria = categoria.cod_categoria WHERE ponto.cd_municipio_cod_ibge = ? ORDER BY ponto.cd_municipio_cod_ibge, ponto.cod_ponto', [cod_ibge], callback);
}

//Lista tudo de ponto e tipologia da tabela de ponto que se relaciona de acordo com o ID de ponto, categoria e o codigo ibge.
CdDAO.prototype.listarPontoTipo = function(cod_ponto, categoria_cod_categoria, cd_municipio_cod_ibge, callback){
	this._connection.query('select ponto.*, tipologia.*, categoria.descricao as "categoria_descricao" from ponto left join ponto_tipologia on ponto.cod_ponto = ponto_tipologia.ponto_cod_ponto and ponto.categoria_cod_categoria = ponto_tipologia.ponto_categoria_cod_categoria and ponto.cd_municipio_cod_ibge = ponto_tipologia.ponto_cd_municipio_cod_ibge left join tipologia on ponto_tipologia.tipologia_cod_tipologia = tipologia.cod_tipologia inner join categoria on categoria.cod_categoria = ponto.categoria_cod_categoria where ponto.cod_ponto = ? and ponto.categoria_cod_categoria = ? and ponto.cd_municipio_cod_ibge = ?', [cod_ponto, categoria_cod_categoria, cd_municipio_cod_ibge], callback);
}

//Salva uma nova tupla na tabela de Ponto.
CdDAO.prototype.salvarPonto = function(ponto, callback){
	this._connection.query('INSERT INTO ponto SET ?',ponto, callback);
}

//Salva uma nova tupla na tabela de Ponto_Tipologia.
CdDAO.prototype.salvarPontoTipo = function(ponto_tipologia, callback){
	this._connection.query('INSERT INTO ponto_tipologia SET ?', ponto_tipologia, callback);
}

//Atualiza uma tupla da tabela de Ponto com base nos IDs.
CdDAO.prototype.editarPonto = function(ponto, cod_ponto, cod_categoria, cod_ibge, callback){
	this._connection.query('UPDATE ponto SET ? WHERE cod_ponto = ? AND categoria_cod_categoria = ? AND cd_municipio_cod_ibge = ?', [ponto, cod_ponto, cod_categoria, cod_ibge], callback);
}

//Apaga uma tupla da tabela de Ponto com base nos IDs.
CdDAO.prototype.apagarPonto = function(cod_ponto, cod_categoria, cd_municipio_cod_ibge, callback){
	this._connection.query('DELETE FROM ponto WHERE cod_ponto = ? AND categoria_cod_categoria = ? AND cd_municipio_cod_ibge = ?', [cod_ponto, cod_categoria, cd_municipio_cod_ibge], callback);
}

//Apaga uma tupla da tabela de Ponto_Tipologia com base nos IDs.
CdDAO.prototype.apagarPontoTipo = function(cod_ponto, cod_categoria, cd_municipio_cod_ibge, cod_tipologia, callback){
	this._connection.query('DELETE FROM ponto_tipologia WHERE ponto_cod_ponto = ? AND ponto_categoria_cod_categoria = ? AND ponto_cd_municipio_cod_ibge = ? AND tipologia_cod_tipologia = ?', [cod_ponto, cod_categoria, cd_municipio_cod_ibge, cod_tipologia], callback);
}




//---------------Querys de Pagamento---------------//

//lista todos os pagamentos com suas cidades.
CdDAO.prototype.listarOtb = function(cod_ibge, callback){
    this._connection.query('SELECT otb.* FROM otb INNER JOIN fatura_otb on otb.cod_otb = fatura_otb.otb_cod_otb inner join fatura ON fatura_otb.fatura_num_nf = fatura.num_nf INNER JOIN municipio on fatura.cd_municipio_cod_ibge = municipio.cod_ibge where municipio.cod_ibge = ?', [cod_ibge], callback);
}




//---------------Querys de Previsão de Empenho---------------//

//lista todos os pagamentos com suas cidades.
CdDAO.prototype.listarCdPrevisaoEmpenho = function(cod_lote, callback){
    this._connection.query('SELECT previsao_empenho.*, concat(natureza_despesa.cod_natureza_despesa, " - ", natureza_despesa.descricao) as descricao FROM previsao_empenho inner join natureza_despesa on (previsao_empenho.natureza_despesa_cod_natureza_despesa = natureza_despesa.cod_natureza_despesa) where previsao_empenho.lote_cod_lote = ?', [cod_lote], callback);
}




//---------------Querys de Empenho---------------//

//lista todos os Pagamentos com suas cidades.
CdDAO.prototype.listarCdEmpenho = function(cod_lote, callback){
    this._connection.query('SELECT empenho.cod_empenho, empenho.data, previsao_empenho.lote_cod_lote, previsao_empenho.tipo, previsao_empenho.ano_referencia, concat(natureza_despesa.cod_natureza_despesa, " - ", natureza_despesa.descricao) as descricao, empenho.previsao_empenho_cod_previsao_empenho FROM empenho  INNER JOIN	previsao_empenho ON (empenho.previsao_empenho_cod_previsao_empenho = previsao_empenho.cod_previsao_empenho) INNER JOIN	natureza_despesa ON (previsao_empenho.natureza_despesa_cod_natureza_despesa = natureza_despesa.cod_natureza_despesa) WHERE previsao_empenho.lote_cod_lote = ?', [cod_lote], callback);
}




//---------------Querys de Fatura---------------//

//lista todas as Faturas com suas cidades.
CdDAO.prototype.listarCdFatura = function(cod_ibge, callback){
    this._connection.query('SELECT fatura.*, concat(municipio.nome_municipio, " - ", municipio.uf) as nome_municipio from fatura inner join municipio on (fatura.cd_municipio_cod_ibge = municipio.cod_ibge) where fatura.cd_municipio_cod_ibge = ?', [cod_ibge], callback);
}


module.exports = function(){
	return CdDAO;
};