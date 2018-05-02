function ModulosDAO(connection){
	this._connection = connection;
}

//Lista todos os atributos da tabela de Módulo.
ModulosDAO.prototype.listarModulo = function(callback){
	this._connection.query('SELECT * FROM modulo', callback);
}

//Listas os codigos dos Modulos de um Usuario com base no Id.
ModulosDAO.prototype.listarModuloUsuario = function(cod_usuario, callback){
	this._connection.query('SELECT modulo_cod_modulo FROM usuario_modulo WHERE usuario_cod_usuario = ?', [cod_usuario], callback);
}

//Salva uma nova tupla na tabela de Usuario_Modulo.
ModulosDAO.prototype.salvarUsuarioModulo = function(usuario_modulo, callback){
	this._connection.query('INSERT INTO usuario_modulo SET ?', usuario_modulo, callback);
}

module.exports = function(){
	return ModulosDAO;
};