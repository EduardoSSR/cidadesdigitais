function NaturezaDespesaDAO(connection){
	this._connection = connection;
}


//Lista tudo da tabela Natureza_Despesa.
NaturezaDespesaDAO.prototype.listarNaturezaDespesa = function(callback){
	this._connection.query('SELECT * FROM natureza_despesa', callback);
}


module.exports = function(){
	return NaturezaDespesaDAO;
};