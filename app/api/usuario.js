module.exports= function(app){
    var api ={};
    
    //Lista todos os Usuários.
    api.listaUsuario = function (req, res){
    	var connection = app.infra.connectionFactory();
        var usuarioDAO = new app.infra.UsuarioDAO(connection);

        usuarioDAO.listarUsuario(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva um novo Usuário no Banco de Dados.
    api.salvaUsuario = function(req, res){
        var connection = app.infra.connectionFactory();
        var usuarioDAO = new app.infra.UsuarioDAO(connection);
        
        var error = false;
        var j = 0;
        
        var usuario = {
            nome: req.body.nome,
            login: req.body.login,
            senha: req.body.senha,
            email: req.body.email,
            telefone: req.body.telefone
        };

        usuarioDAO.salvarUsuario(usuario, function(erro, resultado){
            if(erro){
                console.log(erro);
                error = true;
            }else{
                salvaModulos(resultado.insertId);
            }
        });
        
        connection.end();
        
        function salvaModulos(idUsuario){
            var connection = app.infra.connectionFactory();
            var modulosDAO = new app.infra.ModulosDAO(connection);
            
            var cod_modulo = req.body.modulos;
            for(var i=0; i<cod_modulo.length; i++){

                var usuario_modulo = {
                    usuario_cod_usuario: idUsuario,
                    modulo_cod_modulo: cod_modulo[i]
                }

                modulosDAO.salvarUsuarioModulo(usuario_modulo, function(erro, resultado){
                    if(erro){
                        console.log(erro);
                        error = true;
                    }

                    j++;

                    if(i == j){
                        if(error){
                            res.sendStatus(500);
                        }else{
                            res.sendStatus(200);
                        }
                    }
                });
            }
            
            connection.end();
        }
    };
    
    
    //Lista um único Usuário com base no ID.
    api.listaUsuarioPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var usuarioDAO = new app.infra.UsuarioDAO(connection);

        usuarioDAO.listarUsuario(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var usuario = resultado.find(function(usuario){
                    return usuario.cod_usuario == req.params.id;
                });
                res.status(200).json(usuario);
            }
        });

        connection.end();
    };
    
    
    //Edita um Usuário com base no ID.
    api.editaUsuario = function(req, res){
        var usuario = req.body;
        var id = req.body.cod_usuario;

        var connection = app.infra.connectionFactory();
        var usuarioDAO = new app.infra.UsuarioDAO(connection);
        
        usuarioDAO.editarUsuario(usuario, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Apaga um Usuário com base no ID.
    api.apagaUsuario = function(req, res){
        var id = req.params.id;
        
        var connection = app.infra.connectionFactory();
        var usuarioDAO = new app.infra.UsuarioDAO(connection);

        usuarioDAO.apagarUsuario(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    return api;
};