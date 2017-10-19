module.exports = function(app){
    
//---------------Rotas de Contatos---------------//

    //Rota para listar todos os Contatos.
	app.get('/read/contato', function(req, res){
		var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);
        
        contatoDAO.listarContato(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();

	});
    
    
    
    //Rota para gravar um novo Contato no Banco de Dados.
    app.post('/read/contato', function(req, res){
        var contato = req.body;
        
        var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);

        contatoDAO.salvarContato(contato, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    
    
    
    //Rota usada para atualizar um Contato com base no ID.
    app.put('/read/contato', function(req, res){
        var contato = req.body;
        var cod_contato = req.body.cod_contato;

        var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);
        
        contatoDAO.editarContato(contato, cod_contato, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });



    //Rota usada para apagar um Contato com base no ID.
    app.delete('/read/contato/:id', function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);

        contatoDAO.apagarContato(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    
    
    
    
    
    
    
//---------------Rotas de Telefones---------------//
    
    //Rota para listar todos os Telefones.
    app.get('/read/telefone', function (req, res){
    	var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);

        contatoDAO.listarTelefone(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
    //Rota para gravar um novo Telefone no Banco de Dados.
    app.post('/read/telefone', function(req, res){
        var telefone = req.body;
        
        var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);

        contatoDAO.salvarTelefone(telefone, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    
    
    //Rota usada para apagar um Telefone com base no ID.
    app.delete('/read/telefone/:id', function(req, res){
        var id = req.params.id;
        
        var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);

        contatoDAO.apagarTelefone(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });

};