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
	this._connection.query('SELECT cd.*, municipio.nome_municipio, uf FROM cd INNER JOIN municipio ON cd.municipio_cod_ibge = municipio.cod_ibge', callback);
}

//Salva uma nova tupla na tabela de CD.
CdDAO.prototype.salvarCidadesDigitais = function(cd, callback){
	this._connection.query('INSERT INTO cd SET ?', cd ,callback);
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

//lista todos os itens do Cd.
CdDAO.prototype.listarItens = function(cod_ibge, callback){
	this._connection.query('SELECT cd_itens.cd_municipio_cod_ibge, cd_itens.itens_cod_item, cd_itens.itens_tipo_item_cod_tipo_item, cd_itens.quantidade_previsto, cd_itens.quantidade_projeto_executivo, cd_itens.quantidade_termo_instalacao, itens.descricao, lote_itens.preco FROM cd_itens INNER JOIN itens ON cd_itens.itens_cod_item = itens.cod_item AND cd_itens.itens_tipo_item_cod_tipo_item = itens.tipo_item_cod_tipo_item INNER JOIN lote_itens ON itens.cod_item = lote_itens.itens_cod_item AND itens.tipo_item_cod_tipo_item = lote_itens.itens_tipo_item_cod_tipo_item WHERE cd_itens.cd_municipio_cod_ibge = ?', [cod_ibge] ,callback);
}

//Atualiza uma tupla da tabela de Cd com base no ID.
CdDAO.prototype.editarItens = function(cdItem, cod_ibge, cod_itens, cod_tipo_item, callback){
    this._connection.query('UPDATE cd_itens SET ? WHERE cd_municipio_cod_ibge = ? AND itens_cod_item = ? AND itens_tipo_item_cod_tipo_item = ?', [cdItem, cod_ibge, cod_itens, cod_tipo_item], callback);
}




//---------------Querys de Processo---------------//

//Lista todos os atributos da tabela de Processo.
CdDAO.prototype.listarProcesso = function(callback){
	this._connection.query('SELECT * FROM processo', callback);
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


CdDAO.prototype.listarAcompanhamento = function(callback){
	this._connection.query('SELECT uacom.*, assunto.* FROM uacom INNER JOIN uacom_assunto ON uacom.cd_municipio_cod_ibge = uacom_assunto.uacom_cd_municipio_cod_ibge AND uacom.data = uacom_assunto.uacom_data INNER JOIN assunto ON uacom_assunto.assunto_cod_assunto = assunto.cod_assunto ORDER BY uacom.cd_municipio_cod_ibge, uacom.data', callback);
}


/*CdDAO.prototype.listarTeste = function(callback){
	this._connection.query('SELECT uacom.cd_municipio_cod_ibge ,uacom.data, uacom.relato, group_concat(assunto.cod_assunto) as cod_assunto, group_concat(assunto.descricao) as descricao FROM uacom INNER JOIN uacom_assunto  ON uacom.cd_municipio_cod_ibge = uacom_assunto.uacom_cd_municipio_cod_ibge AND uacom.data = uacom_assunto.uacom_data INNER JOIN assunto ON uacom_assunto.assunto_cod_assunto = assunto.cod_assunto group by uacom.data', callback);
}*/

//Salva uma nova tupla na tabela de Uacom (Acompanhamento).
CdDAO.prototype.salvarAcompanhamento = function(uacom, callback){
	this._connection.query('INSERT INTO uacom SET ?', uacom, callback);
}

//Salva uma nova tupla na tabela de Ponto_Tipologia.
CdDAO.prototype.salvarUacomAssun = function(uacom_assunto, callback){
	this._connection.query('INSERT INTO uacom_assunto SET ?', uacom_assunto, callback);
}


//---------------Querys de Ponto---------------//

//Lista todos os atributos da tabela de Ponto.
CdDAO.prototype.listarPonto = function(callback){
	this._connection.query('select ponto.*, tipologia.* from ponto inner join ponto_tipologia on ponto.cod_ponto = ponto_tipologia.ponto_cod_ponto and ponto.categoria_cod_categoria = ponto_tipologia.ponto_categoria_cod_categoria and ponto.cd_municipio_cod_ibge = ponto_tipologia.ponto_cd_municipio_cod_ibge inner join tipologia on ponto_tipologia.tipologia_cod_tipologia = tipologia.cod_tipologia', callback);
}


CdDAO.prototype.listarPontoTipo = function(cod_ponto, categoria_cod_categoria, cd_municipio_cod_ibge, callback){
	this._connection.query('select ponto.*, tipologia.* from ponto inner join ponto_tipologia on ponto.cod_ponto = ponto_tipologia.ponto_cod_ponto and ponto.categoria_cod_categoria = ponto_tipologia.ponto_categoria_cod_categoria and ponto.cd_municipio_cod_ibge = ponto_tipologia.ponto_cd_municipio_cod_ibge inner join tipologia on ponto_tipologia.tipologia_cod_tipologia = tipologia.cod_tipologia where ponto.cod_ponto = ? and ponto.categoria_cod_categoria = ? and ponto.cd_municipio_cod_ibge = ?', [cod_ponto, categoria_cod_categoria, cd_municipio_cod_ibge], callback);
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
	this._connection.query('UPDATE ponto SET ?  WHERE cod_ponto = ? AND categoria_cod_categoria = ? AND cd_municipio_cod_ibge = ?',[ponto, cod_ponto, cod_categoria, cod_ibge], callback);
}

//Atualiza uma tupla da tabela de Ponto com base nos IDs.
CdDAO.prototype.editarPontoTipo = function(ponto_tipologia, cod_ponto, cod_categoria, cod_ibge, tipologia_cod_tipologia, callback){
	this._connection.query('UPDATE ponto_tipologia SET ?  WHERE ponto_cod_ponto = ? AND ponto_categoria_cod_categoria = ? AND ponto_cd_municipio_cod_ibge = ? AND tipologia_cod_tipologia = ?',[ponto_tipologia, cod_ponto, cod_categoria, cod_ibge, tipologia_cod_tipologia], callback);
}

//Apaga uma tupla da tabela de Ponto com base nos IDs.
CdDAO.prototype.apagarPonto = function(cod_ponto, cod_categoria, cd_municipio_cod_ibge, callback){
	this._connection.query('DELETE FROM ponto WHERE cod_ponto = ? AND categoria_cod_categoria = ? AND cd_municipio_cod_ibge = ?', [cod_ponto, cd_municipio_cod_ibge], callback);
}


module.exports = function(){
	return CdDAO;
};