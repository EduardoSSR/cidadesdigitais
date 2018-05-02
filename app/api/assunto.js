module.exports = function(app){
    var api = {};
    
    //Lista todos os Assuntos.
    api.listaAssunto = function (req, res){
        var connection = app.infra.connectionFactory();
        var assuntosDAO = new app.infra.AssuntoDAO(connection);

        assuntosDAO.listarAssunto(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva um novo Assunto no Banco de Dados.
    api.salvaAssunto = function(req, res){
    	var assunto = req.body;
        
    	var connection = app.infra.connectionFactory();
        var assuntosDAO = new app.infra.AssuntoDAO(connection);

        assuntosDAO.salvarAssunto(assunto, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
        
        connection.end();
    };
    
    
    //Lista um único Assunto com base no ID.
    api.listaAssuntoPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var assuntosDAO = new app.infra.AssuntoDAO(connection);

        assuntosDAO.listarAssunto(function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var assunto = resultado.find(function(assunto){
                    return assunto.cod_assunto == req.params.id;
                });
                res.status(200).json(assunto);
            }
        });

        connection.end();
    };
    
    
    //Edita um Assunto com base no ID.
    api.editaAssunto = function(req, res){
        var assunto = req.body;
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var assuntosDAO = new app.infra.AssuntoDAO(connection);
        
        assuntosDAO.editarAssunto(assunto, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    }
    
    
    //Apaga um Assunto com base no ID.
    api.apagaAssunto = function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var assuntosDAO = new app.infra.AssuntoDAO(connection);

        assuntosDAO.apagarAssunto(id,  function(erro, resultado){
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