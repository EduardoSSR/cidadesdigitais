function FaturaDAO(connection){
	this._connection = connection;
}

//Provavelmente está errado.
FaturaDAO.prototype.listar = function(callback){
	this._connection.query('SELECT fatura.*, municipio.nome_municipio from fatura inner join municipio on (fatura.cd_municipio_cod_ibge = municipio.cod_ibge) where fatura.cd_municipio_cod_ibge = municipio.cod_ibge', callback);
}

/*FaturaDAO.prototype.listar2 = function(idFatura, callback){
	this._connection.query('SELECT fatura', callback);
}*/

//Salva uma nova tupla na tabela de Fatura.
FaturaDAO.prototype.salvar = function(fatura, callback){
    this._connection.query('INSERT INTO fatura SET ?', fatura, callback);
}

//Atualiza uma tupla da tabela de Fatura com base no ID.
FaturaDAO.prototype.editar = function(fatura, id, callback){
    this._connection.query('UPDATE fatura SET ? WHERE num_nf = ?', [fatura, id], callback);
}

//Apaga uma tupla da tabela de Fatura com base no ID.
FaturaDAO.prototype.apagar = function(id, callback){
    this._connection.query('DELETE FROM fatura WHERE num_nf = ?', [id], callback);
}

module.exports = function(){
	return FaturaDAO;
};