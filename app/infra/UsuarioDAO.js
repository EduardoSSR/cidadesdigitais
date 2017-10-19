function UsuarioDAO(connection){
	this._connection = connection;
}


//---------------Querys de Usuário---------------//

//Lista todos os atributos da tabela de Usuario e trás junto a descrição do Perfil.
UsuarioDAO.prototype.listarUsuario = function(callback){
	this._connection.query('SELECT cod_usuario, nome, login, email, telefone, perfil_cod_perfil, descricao FROM usuario INNER JOIN perfil ON usuario.perfil_cod_perfil = perfil.cod_perfil', callback);
}

//Salva uma nova tupla na tabela de Usuario.
UsuarioDAO.prototype.salvarUsuario = function(usuario, callback){
	this._connection.query('INSERT INTO usuario SET ?',usuario, callback);
}

//Atualiza uma tupla da tabela de Usuario com base no ID.
UsuarioDAO.prototype.editarUsuario = function(usuario, id, callback){
	this._connection.query('UPDATE usuario SET ?  WHERE cod_usuario = ? ',[usuario, id], callback);
}

//Apaga uma tupla da tabela de Usuario com base no ID.
UsuarioDAO.prototype.apagarUsuario = function(id, callback){
	this._connection.query('DELETE FROM usuario where cod_usuario = ?',[id], callback);
}





//---------------Querys de Perfil---------------//

//Lista tudo da tabela Perfil.
UsuarioDAO.prototype.listarPerfil = function(callback){
	this._connection.query('SELECT * FROM perfil', callback);
}


module.exports = function(){
	return UsuarioDAO;
};