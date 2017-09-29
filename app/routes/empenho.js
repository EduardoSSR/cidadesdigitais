module.exports = function(app){


	app.get('/read/loteItens/:id', function(req, res){
        var codEmpenho = req.params.id;

    	var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.listar(codEmpenho,function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    

    app.get('/read/empenho', function(req, res){
        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.listar2(function(erro, resultado){
            if(erro){ 
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
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



    app.post('/read/empenho', function(req, res){
        var empenho = req.body;
        console.log(empenho);
        
        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.salvar(empenho, function(erro, resultado){
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
        
        empenhoDAO.editar(empenho, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });



    app.get('/read/empenhoAll/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.listar2(function (erro, resultado){
            var empenho = resultado.find(function(empenho){
                return empenho.cod_empenho == req.params.id;
            });
            res.status(200).json(empenho);
        });

        connection.end();
    });



    app.get('/read/empenho/:id', function(req, res){
        var idLote = req.params.id;

        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.listar2(idLote, function(erro, resultado){
            if(erro){ 
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();        
    });



    app.delete('/read/empenho/:id', function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.apagar(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });

}