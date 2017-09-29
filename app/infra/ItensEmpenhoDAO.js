function ItensEmpenhoDAO(connection){
	this._connection = connection;
}

//também pode estar errado.
ItensEmpenhoDAO.prototype.listar = function(itensEmpenhoID, callback){
	this._connection.query('SELECT sequencia, descricao, valor, quantidade FROM itens_empenho INNER JOIN itens ON lote_itens_itens_cod_item = ?',[itensEmpenhoID], callback);
}

//Salva uma nova tupla na tabela de Itens_Empenho.
ItensEmpenhoDAO.prototype.salvar = function(itensEmpenho, callback){
    this._connection.query('INSERT INTO itens_empenho SET ?', itensEmpenho, callback);
}

module.exports = function(){
	return ItensEmpenhoDAO;
};