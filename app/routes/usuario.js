module.exports = function (app){

//------------------Rotas de Usuarios--------------------//    
    
    //Rota para listar todos os Usuários.
    app.get('/read/usuario', function (req, res){
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
    });
    

    
    //Rota para gravar um novo Usuário no Banco de Dados.
    app.post('/read/usuario', function(req, res){
        var usuario = req.body;
        
        var connection = app.infra.connectionFactory();
        var usuarioDAO = new app.infra.UsuarioDAO(connection);

        usuarioDAO.salvarUsuario(usuario, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    


    //Rota usada para atualizar um Usuário com base no ID.
    app.put('/read/usuario', function(req, res){
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
    });



    //Rota para listar um único Usuário com base no ID.
    app.get('/read/usuario/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var usuarioDAO = new app.infra.UsuarioDAO(connection);

        usuarioDAO.listarUsuario(function (erro, resultado){
            var usuario = resultado.find(function(usuario){
                return usuario.cod_usuario == req.params.id;
            });
            res.status(200).json(usuario);
        });

        connection.end();
    });



    //Rota usada para apagar um Usuário com base no ID.
    app.delete('/read/usuario/:id', function(req, res){
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
    });
    
    
    

//------------------Rotas de Perfil do Usuário--------------------//
    
    //Rota para listar todos os perfis.
    app.get('/read/perfil', function(req, res){
    	var connection = app.infra.connectionFactory();
        var usuarioDAO = new app.infra.UsuarioDAO(connection);

        usuarioDAO.listarPerfil(function(erro, resultado){
            res.json(resultado);
        });

        connection.end();
    });
    
};