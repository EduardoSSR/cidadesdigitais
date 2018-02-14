module.exports = function(app){
    var api = {};
    
//---------------Callbacks de Contatos---------------//
    
    //Lista todos os Contatos.
    api.listaContato = function(req, res){
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

	};
    
    
    //Salva um novo Contato no Banco de Dados.
    api.salvaContato = function(req, res){
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
    };
    
    
    //Edita um Contatos com base no ID.
    api.editaContato = function(req, res){
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
    };
    
    
    //Apaga um Contatos com base no ID.
    api.apagaContato = function(req, res){
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
    }
    
    
//---------------Callbacks de Telefones---------------//
    
    //Lista todos os Telefones.
    api.listaTelefone = function (req, res){
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
    };
    
    
    //Salva um novo Telefone no Banco de Dados.
    api.salvarTelefone = function(req, res){
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
    };
    
    
    //Apaga um Telefone com base no ID.
    api.apagaTelefone = function(req, res){
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
    };
    
    return api;
};