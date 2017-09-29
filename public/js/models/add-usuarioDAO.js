function UsuariosDAO(connection){
	this._connection = connection;
}

UsuariosDAO.prototype.getUsuarios = function(callback){
	this._connection.query('select * from usuario', callback);
}

/*UsuariosDAO.prototype.getUsuario = function(callback){
	this._connection.query( 'select * from usuario where id_noticia = 2', callback);	
}*/

UsuariosDAO.prototype.salvarUsuario = function(usuario,  callback){
    this._connection.query('insert into usuario set ?', usuario, callback);
}	

module.exports = function(){
	return UsuariosDAO;
}