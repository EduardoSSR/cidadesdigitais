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
	this._connection.query('select otb.cod_otb, fatura.*, municipio.nome_municipio from otb inner join fatura_otb on otb.cod_otb = fatura_otb.otb_cod_otb inner join fatura on fatura_otb.fatura_num_nf = fatura.num_nf inner join municipio on fatura.cd_municipio_cod_ibge = municipio.cod_ibge where otb.cod_otb = ?', [cod_otb], callback);
}

//.
OtbDAO.prototype.listarMuniFatura = function(cd_municipio_cod_ibge, callback){
	this._connection.query('select fatura.*, municipio.nome_municipio from fatura inner join municipio on fatura.cd_municipio_cod_ibge = municipio.cod_ibge where cd_municipio_cod_ibge = ?', [cd_municipio_cod_ibge], callback);
}



//---------------Querys de Itens---------------//

OtbDAO.prototype.listarItens = function(cod_otb, callback){
	this._connection.query('select itens_otb.*, concat(itens.tipo_item_cod_tipo_item, ".", itens.cod_item," - ", itens.descricao) as descricao_item from itens_otb inner join itens on (itens_otb.cod_item = itens.cod_item and itens_otb.cod_tipo_item = itens.tipo_item_cod_tipo_item) where otb_cod_otb = ?', [cod_otb], callback);
}

OtbDAO.prototype.editarItens = function(otbItens, otb_cod_otb, itens_fatura_fatura_num_nf, cod_item, cod_tipo_item, callback){
	this._connection.query('UPDATE itens_otb SET ? WHERE otb_cod_otb = ? AND itens_fatura_fatura_num_nf = ? AND cod_item = ? AND cod_tipo_item = ?',[otbItens, otb_cod_otb, itens_fatura_fatura_num_nf, cod_item, cod_tipo_item], callback);
}


module.exports = function(){
	return OtbDAO;
};