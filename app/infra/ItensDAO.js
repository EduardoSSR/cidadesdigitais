function ItensDAO(connection){
	this._connection = connection;
}

//Lista codigo item, tipo do item natureza despesa, descrição de natureza despesa, codigo da classe empenho unidades da tabela itens e concatena tipo item, cod item e descrição da tabela itens, onde natureza despesa de item é igual a natureza despesa ordenando por tipo item e cod_tem.
ItensDAO.prototype.listarItens = function(callback){
	this._connection.query('select concat(itens.tipo_item_cod_tipo_item, ".", itens.cod_item," - ", itens.descricao) as item_descricao, cod_item, tipo_item_cod_tipo_item, natureza_despesa_cod_natureza_despesa, natureza_despesa.descricao, classe_empenho_cod_classe_empenho, unidade from itens inner join natureza_despesa on (itens.natureza_despesa_cod_natureza_despesa = natureza_despesa.cod_natureza_despesa) order by itens.tipo_item_cod_tipo_item, itens.cod_item', callback);
}

//Salva uma nova tupla na tabela de Itens.
ItensDAO.prototype.salvarItens = function(item, callback){
	this._connection.query('INSERT INTO itens SET ?', item, callback);
}

//Atualiza uma tupla da tabela de Itens com base no ID.
ItensDAO.prototype.editarItens = function(item, cod_item, cod_tipo_item, callback){
    this._connection.query('UPDATE itens SET ? WHERE cod_item = ? AND tipo_item_cod_tipo_item = ?', [item, cod_item, cod_tipo_item], callback);
}

//Apaga uma tupla da tabela de Item com base no ID.
ItensDAO.prototype.apagarItens = function(cod_item, cod_ipo_item, callback){
    this._connection.query('DELETE FROM itens WHERE cod_item = ? AND tipo_item_cod_tipo_item = ?', [cod_item, cod_ipo_item], callback);
}

module.exports = function(){
	return ItensDAO;
};

