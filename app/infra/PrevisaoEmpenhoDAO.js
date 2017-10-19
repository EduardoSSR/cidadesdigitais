function PrevisaoEmpenhoDAO(connection){
	this._connection = connection;
}


//Lista tudo da tabela Previsao_Empenho.
PrevisaoEmpenhoDAO.prototype.listarPrevisaoEmpenho = function(callback){
	this._connection.query('SELECT previsao_empenho.*, natureza_despesa.descricao FROM previsao_empenho inner join	natureza_despesa on (previsao_empenho.natureza_despesa_cod_natureza_despesa = natureza_despesa.cod_natureza_despesa)', callback);
}

//Salva uma nova tupla na tabela de Previsao_Empenho.
PrevisaoEmpenhoDAO.prototype.salvarPrevisaoEmpenho = function(previsaoEmpenho, callback){
    this._connection.query('INSERT INTO previsao_empenho SET ?', previsaoEmpenho, callback);
}

//Atualiza uma tupla da tabela de Previsao_Empenho com base no ID.
PrevisaoEmpenhoDAO.prototype.editarPrevisaoEmpenho = function(previsaoEmpenho, id, callback){
    this._connection.query('UPDATE previsao_empenho SET ? WHERE cod_previsao_empenho = ?', [previsaoEmpenho, id], callback);
}

//Apaga uma tupla da tabela de Previsao_Empenho com base no ID.
PrevisaoEmpenhoDAO.prototype.apagarPrevisaoEmpenho = function(id, callback){
    this._connection.query('DELETE FROM previsao_empenho WHERE cod_lote = ?', [id], callback);
}


module.exports = function(){
	return PrevisaoEmpenhoDAO;
};