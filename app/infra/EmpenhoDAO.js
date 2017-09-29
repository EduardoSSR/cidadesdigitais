function EmpenhoDAO(connection){
	this._connection = connection;
}

//Seleciona todos os itens existentes da tabela itens_empenho.
EmpenhoDAO.prototype.listar = function(empenho_cod_empenho, callback){
	this._connection.query("SELECT itens.cod_item, itens.tipo_item_cod_tipo_item, itens.descricao, lote_itens.preco, lote_itens.preco_bdi, itens_empenho.sequencia, itens_empenho.empenho_cod_empenho, itens_empenho.lote_itens_lote_cod_lote, itens_empenho.valor, itens_empenho.quantidade FROM itens_empenho inner join empenho on (itens_empenho.empenho_cod_empenho = empenho.cod_empenho)inner join lote_itens on (itens_empenho.lote_itens_lote_cod_lote = lote_itens.lote_cod_lote and itens_empenho.lote_itens_itens_cod_item = lote_itens.itens_cod_item and itens_empenho.lote_itens_itens_tipo_item_cod_tipo_item = lote_itens.itens_tipo_item_cod_tipo_item)inner join itens on (lote_itens.itens_cod_item = itens.cod_item and lote_itens.itens_tipo_item_cod_tipo_item = itens.tipo_item_cod_tipo_item)where empenho.natureza_despesa_cod_natureza_despesa = itens.natureza_despesa_cod_natureza_despesa and itens_empenho.empenho_cod_empenho = 1",[empenho_cod_empenho], callback);
}

//Lista tudo da tabela Empenho.
EmpenhoDAO.prototype.listar2 = function(callback){
    this._connection.query('SELECT * FROM empenho', callback);
}

//Lista tudo da tabela Empenho_Itens.
EmpenhoDAO.prototype.empenhoItens = function(codEmpenho, callback){
    this._connection.query('SELECT itens.cod_item, itens.tipo_item_cod_tipo_item, itens.descricao, itens.unidade, itens_empenho.valor, itens_empenho.quantidade FROM itens_empenho inner join itens on (itens_empenho.cod_item = itens.cod_item and itens_empenho.cod_tipo_item = itens.tipo_item_cod_tipo_item) where itens_empenho.cod_empenho = ?', [codEmpenho], callback);
}

//Lista os Empenhos que possuem relação com um determinado ID da tabela Lote.
EmpenhoDAO.prototype.empenhoLote = function(idLote, callback){
    this._connection.query('SELECT * FROM empenho where lote_cod_lote = ?',[idLote], callback);
}

//Salva uma nova tupla na tabela de Empenho.
EmpenhoDAO.prototype.salvar = function(empenho, callback){
    this._connection.query('INSERT INTO empenho SET ?', empenho, callback);
}

//Atualiza uma tupla da tabela de Empenho com base no ID.
EmpenhoDAO.prototype.editar = function(empenho, id, callback){
    this._connection.query('UPDATE empenho SET ? WHERE cod_empenho = ?', [empenho, id], callback);
}

//Apaga uma tupla da tabela de Empenho com base no ID.
EmpenhoDAO.prototype.apagar = function(id, callback){
    this._connection.query('DELETE FROM empenho WHERE cod_empenho = ?', [id], callback);
}

module.exports = function(){
	return EmpenhoDAO;
};
