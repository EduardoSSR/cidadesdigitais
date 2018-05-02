module.exports = function(app){
    var api = {};
    
    //Lista todas as Entidades.
    api.listaEntidade = function(req, res){
        var connection = app.infra.connectionFactory();
        var entidadesDAO = new app.infra.EntidadesDAO(connection);

        entidadesDAO.listarEntidade(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva uma nova Entidade no Banco de Dados.
    api.salvaEntidade = function(req, res){
        var entidade = req.body;
        
        var connection = app.infra.connectionFactory();
        var entidadesDAO = new app.infra.EntidadesDAO(connection);

        entidadesDAO.salvarEntidade(entidade, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Lista uma única Entidade com base no ID.
    api.listaEntidadePorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var entidadesDAO = new app.infra.EntidadesDAO(connection);

        entidadesDAO.listarEntidade(function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var entidade = resultado.find(function(entidade){
                    return entidade.cnpj == req.params.id;
                });
                res.status(200).json(entidade);
            }
        });

        connection.end();
    };
    
    
    //Edita uma Entidade com base no ID.
    api.editaEntidade = function(req, res){
        var entidade = req.body;
        var id = req.body.cnpj;
        
        var connection = app.infra.connectionFactory();
        var entidadesDAO = new app.infra.EntidadesDAO(connection);
        
        entidadesDAO.editarEntidade(entidade, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
    };
    
    
    //Apaga uma Entidade com base no ID.
    api.apagaEntidade = function(req, res){
        var id = req.params.id;
        
        var connection = app.infra.connectionFactory();
        var entidadesDAO = new app.infra.EntidadesDAO(connection);

        entidadesDAO.apagarEntidade(id, function(erro, resultado){
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