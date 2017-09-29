function PrevisaoEmpenhoDAO(connection){
	this._connection = connection;
}

//Lista tudo da tabela Previsao_Empenho.
PrevisaoEmpenhoDAO.prototype.listar = function(callback){
	this._connection.query('SELECT * FROM previsao_empenho', callback);
}

//Salva uma nova tupla na tabela de Previsao_Empenho.
PrevisaoEmpenhoDAO.prototype.salvar = function(previsaoEmpenho, callback){
    this._connection.query('INSERT INTO previsao_empenho SET ?', previsaoEmpenho, callback);
}

//Atualiza uma tupla da tabela de Previsao_Empenho com base no ID.
PrevisaoEmpenhoDAO.prototype.editar = function(previsaoEmpenho, id, callback){
    this._connection.query('UPDATE previsao_empenho SET ? WHERE cod_previsao_empenho = ?', [previsaoEmpenho, id], callback);
}

//Apaga uma tupla da tabela de Previsao_Empenho com base no ID.
PrevisaoEmpenhoDAO.prototype.apagar = function(id, callback){
    this._connection.query('DELETE FROM previsao_empenho WHERE cod_lote = ?', [id], callback);
}

module.exports = function(){
	return PrevisaoEmpenhoDAO;
};