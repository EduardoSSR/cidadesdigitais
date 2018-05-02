module.exports = function(app){
    var api = {};
    
    //Lista todas as Classe_Empenho.
    api.listaClasseEmpenho = function (req, res){
    	var connection = app.infra.connectionFactory();
        var classeEmpenhoDAO = new app.infra.ClasseEmpenhoDAO(connection);

        classeEmpenhoDAO.listarClasseEmpenho(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva uma nova Classe_Empenho no Banco de Dados.
    api.salvaClasseEmpenho = function(req, res){
        var classeEmpenho = req.body;
        
        var connection = app.infra.connectionFactory();
        var classeEmpenhoDAO = new app.infra.ClasseEmpenhoDAO(connection);

        classeEmpenhoDAO.salvarClasseEmpenho(classeEmpenho, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                console.log(resultado.insertId);
                res.status(200).json(resultado.insertId);
            }
        });

        connection.end();
    };
    
    
    //Lista uma única Classe_Empenho com base no ID.
    api.listaClasseEmpenhoPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var classeEmpenhoDAO = new app.infra.ClasseEmpenhoDAO(connection);

        classeEmpenhoDAO.listarClasseEmpenho(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var classeEmpenho = resultado.find(function(classeEmpenho){
                    return classeEmpenho.cod_classe_empenho == req.params.id;
                });
                res.status(200).json(classeEmpenho);
            }
        });

        connection.end();
    };
    
    
    //Edita uma Classe_Empenho com base no ID.
    api.editaClasseEmpenho = function(req, res){
        var classeEmpenho = req.body;
        var id = req.body.cod_classe_empenho;

        var connection = app.infra.connectionFactory();
        var classeEmpenhoDAO = new app.infra.ClasseEmpenhoDAO(connection);
        
        classeEmpenhoDAO.editarClasseEmpenho(classeEmpenho, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Apaga uma Classe_Empenho com base no ID.
    api.apagaClasseEmpenho = function(req, res){
        var id = req.params.id;
        var connection = app.infra.connectionFactory();
        var classeEmpenhoDAO = new app.infra.ClasseEmpenhoDAO(connection);

        classeEmpenhoDAO.apagarClasseEmpenho(id,  function(erro, resultado){
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