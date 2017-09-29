function ItensDAO(connection){
	this._connection = connection;
}

//Lista alguns atributos da tabela Itens.
ItensDAO.prototype.listaItens = function(lote_cod_lote, callback){
	this._connection.query('SELECT * FROM lote_itens inner join itens on lote_itens.itens_cod_item = itens.cod_item and lote_itens.itens_tipo_item_cod_tipo_item = itens.tipo_item_cod_tipo_item where lote_cod_lote = ?', [lote_cod_lote], callback);
}

//Atualiza uma tupla da tabela de Itens com base no cod_item e com o tipo_item_cod_tipo_item.
ItensDAO.prototype.editar = function(itens, callback){
	this._connection.query('UPDATE itens SET ?  WHERE cod_item = itens.cod_item AND tipo_item_cod_tipo_item = itens.tipo_item_cod_tipo_item',itens, callback);
}

module.exports = function(){
	return ItensDAO;
};