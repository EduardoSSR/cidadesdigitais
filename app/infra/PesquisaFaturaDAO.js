function PesquisaFaturaDAO(connection){
	this._connection = connection;
}

//Lista todos os Empenhos relacionados com um determinado ID de um Lote.
PesquisaFaturaDAO.prototype.procurarEmpenho = function(idLote, callback){
    this._connection.query('SELECT cod_empenho FROM empenho WHERE lote_cod_lote = ?', [idLote], callback);
}

//Lista todos os Lotes relacionados com um determinado ID de um Empenho.
PesquisaFaturaDAO.prototype.procurarItens = function(idEmpenho, callback){
    this._connection.query('SELECT lote_itens_lote_cod_lote, descricao FROM itens_empenho inner join itens on cod_item = lote_itens_lote_cod_lote WHERE empenho_cod_empenho = ?', [idEmpenho], callback);
}

//Lista todas as informações de um Itens com base no ID.
PesquisaFaturaDAO.prototype.detalhesItens = function(idItem, callback){
    this._connection.query('SELECT * FROM itens WHERE cod_item = ?', [idItem], callback);
}

module.exports = function(){
	return PesquisaFaturaDAO;
};