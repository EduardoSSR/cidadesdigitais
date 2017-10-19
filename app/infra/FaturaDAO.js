function FaturaDAO(connection){
	this._connection = connection;
}

//Provavelmente está errado.
FaturaDAO.prototype.listarFatura = function(callback){
	this._connection.query('SELECT fatura.*, municipio.nome_municipio from fatura inner join municipio on (fatura.cd_municipio_cod_ibge = municipio.cod_ibge) where fatura.cd_municipio_cod_ibge = municipio.cod_ibge', callback);
}

/*FaturaDAO.prototype.listarItensFatura = function(idFatura, callback){
	this._connection.query('SELECT', callback);
}*/

//Salva uma nova tupla na tabela de Fatura.
FaturaDAO.prototype.salvarFatura = function(fatura, callback){
    this._connection.query('INSERT INTO fatura SET ?', fatura, callback);
}

//Atualiza uma tupla da tabela de Fatura com base no ID.
FaturaDAO.prototype.editarFatura = function(fatura, id, callback){
    this._connection.query('UPDATE fatura SET ? WHERE num_nf = ?', [fatura, id], callback);
}

//Apaga uma tupla da tabela de Fatura com base no ID.
FaturaDAO.prototype.apagarFatura = function(id, callback){
    this._connection.query('DELETE FROM fatura WHERE num_nf = ?', [id], callback);
}

module.exports = function(){
	return FaturaDAO;
};