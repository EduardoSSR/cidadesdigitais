function NaturezaDespesaDAO(connection){
	this._connection = connection;
}


//Lista tudo da tabela Natureza_Despesa.
NaturezaDespesaDAO.prototype.listarNaturezaDespesa = function(callback){
	this._connection.query('SELECT natureza_despesa.cod_natureza_despesa, concat(natureza_despesa.cod_natureza_despesa, " - ", natureza_despesa.descricao) as descricao FROM natureza_despesa', callback);
}

//Salva uma nova tupla na tabela de natureza de despesa.
NaturezaDespesaDAO.prototype.salvarNaturezaDespesa = function(naturezaDespesa, callback){
    this._connection.query('INSERT INTO natureza_despesa SET ?', naturezaDespesa, callback);
}

//Atualiza uma tupla da tabela de natureza despesa com base no ID.
NaturezaDespesaDAO.prototype.editarNaturezaDespesa = function(naturezaDespesa, cod_natureza_despesa, callback){
	this._connection.query('UPDATE natureza_despesa SET ? WHERE cod_natureza_despesa = ? ', [naturezaDespesa, cod_natureza_despesa], callback);
}

//Apaga uma tupla da tabela de natureza despesa com base no ID.
NaturezaDespesaDAO.prototype.apagarNaturezaDespesa = function(id, callback){
    this._connection.query('DELETE FROM natureza_despesa WHERE cod_natureza_despesa = ?', [id], callback);
}


module.exports = function(){
	return NaturezaDespesaDAO;
};