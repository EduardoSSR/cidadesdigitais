function CdDAO(connection){
	this._connection = connection;
}

//Lista tudo da tabela CD.
CdDAO.prototype.listarAll = function(callback){
	this._connection.query('select cd.*, municipio.nome_municipio, uf from cd inner join municipio on ( cd.municipio_cod_ibge = municipio.cod_ibge) where cd.municipio_cod_ibge = municipio.cod_ibge', callback);
}

//Lista tudo da tabela cd e busca o nome do municipio da tabela municipio de acordo com o codígo ibge.
CdDAO.prototype.listar = function(id, callback){
	this._connection.query('select cd.*, municipio.nome_municipio from cd inner join municipio on ( cd.municipio_cod_ibge = municipio.cod_ibge) where cd.municipio_cod_ibge = ?', [id] ,callback);
}

//lista todos os municipios e seus respectivos codigos ibge de acordo com a uf recebida.
CdDAO.prototype.listarM = function(uf, callback){
	this._connection.query('select cod_ibge, nome_municipio from municipio where uf = ?', [uf] ,callback);
}

//lista todos os itens do Cd.
CdDAO.prototype.listarItens = function(cod_ibge, callback){
	this._connection.query('select * from cd_itens inner join itens on cd_itens.itens_cod_item = itens.cod_item and cd_itens.itens_tipo_item_cod_tipo_item = itens.tipo_item_cod_tipo_item where cd_itens.cd_municipio_cod_ibge = ?', [cod_ibge] ,callback);
}

CdDAO.prototype.salvar = function(cd, callback){
	this._connection.query('INSERT INTO cdd SET ?', cd ,callback);
}

//Atualiza uma tupla da tabela de cd com base no codígo ibge.
CdDAO.prototype.editar = function(cd, cod_ibge, callback){
    this._connection.query('UPDATE cd SET ? WHERE municipio_cod_ibge = ?', [cd, cod_ibge], callback);
}


//Atualiza varias tuplas da tabela cd_itens.
CdDAO.prototype.editarItens = function(cdItem, cd_municipio_cod_ibge, callback){
    this._connection.query('UPDATE cd_itens SET ? WHERE cd_municipio_cod_ibge = ?', [cdItem, cd_municipio_cod_ibge], callback);
}

//Apaga uma tupla da tabela de cd com base no ID.
CdDAO.prototype.apagar = function(id, callback){
	this._connection.query('DELETE FROM cd WHERE municipio_cod_ibge = ?',[id], callback);
}

module.exports = function(){
	return CdDAO;
};