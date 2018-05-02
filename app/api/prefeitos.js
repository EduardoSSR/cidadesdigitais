module.exports = function(app){
    var api = {};
    
    //Lista todos os Prefeitos.
    api.listaPrefeitos = function(req, res){
    	var connection = app.infra.connectionFactory();
        var prefeitosDAO = new app.infra.PrefeitosDAO(connection);

        prefeitosDAO.listarPrefeitos(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva um novo Prefeito no Banco de Dados.
    api.salvaPrefeitos = function(req, res){
    	var prefeitos = req.body;
    	
    	var connection = app.infra.connectionFactory();
        var prefeitosDAO = new app.infra.PrefeitosDAO(connection);

        prefeitosDAO.salvarPrefeitos(prefeitos, function(erro, resultado){
        	if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
    }
    
    
    //Lista um único Prefeito com base no ID.
    api.listaPrefeitosPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var prefeitosDAO = new app.infra.PrefeitosDAO(connection);

        prefeitosDAO.listarPrefeitos(function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var prefeitos = resultado.find(function(prefeitos){
                    return prefeitos.cod_prefeito == req.params.id;
                });
                res.status(200).json(prefeitos);
            }
        });

        connection.end();
    };
    
    
    //Edita um Prefeito com base no ID.
    api.editaPrefeitos = function(req, res){
        var prefeito = req.body;
        var cod_prefeito = req.body.cod_prefeito;

        var connection = app.infra.connectionFactory();
        var prefeitosDAO = new app.infra.PrefeitosDAO(connection);
        
        prefeitosDAO.editarPrefeitos(prefeito, cod_prefeito, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    }
    
    
    //Apaga um Prefeito com base no ID.
    api.apagaPrefeitos = function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var prefeitosDAO = new app.infra.PrefeitosDAO(connection);

        prefeitosDAO.apagarPrefeitos(id, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    }
    
    
    return api;
};