module.exports = function(app){
    
//---------------Rotas de Empenho---------------//  

    app.get('/read/empenho', function(req, res){
        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.listarEmpenho(function(erro, resultado){
            if(erro){ 
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
    
    app.post('/read/empenho', function(req, res){
        var empenho = req.body;
        
        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.salvarEmpenho(empenho, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    
    
    
    app.put('/read/empenho', function(req, res){
        var empenho = req.body;
        var id = req.body.cod_empenho;

        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);
        
        empenhoDAO.editarEmpenho(empenho, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    
    
    
    app.get('/read/empenho/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.listarEmpenho(function (erro, resultado){
            var empenho = resultado.find(function(empenho){
                return empenho.cod_empenho == req.params.id;
            });
            res.status(200).json(empenho);
        });

        connection.end();
    });
    
    
    
    app.delete('/read/empenho/:id', function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.apagarEmpenho(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    
    
    
    
    
//---------------Rotas de Itens---------------//
    
    app.get('/read/empenhoItens/:id', function(req, res){
        var codEmpenho = req.params.id;
        
        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.empenhoItens(codEmpenho, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });

}