module.exports = function(app){
    
//---------------Rotas de Lote---------------//

    //Rota para listar todos os lotes.
    app.get('/read/lotes', function(req, res){
    	var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);

        lotesDAO.listarLote(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });


    //Rota para gravar um novo lote no Banco de Dados.
    app.post('/read/lotes', function(req, res){
        var lotes = req.body;
        
        var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);

        lotesDAO.salvarLote(lotes, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });



    //Rota usada para atualizar um lote com base no ID.
    app.put('/read/lotes', function(req, res){
        var lotes = req.body;
        var id = req.body.cod_lote;

        var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);
        
        lotesDAO.editarLote(lotes, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });



    //Rota para listar um único lote com base no ID.
    app.get('/read/lotes/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);

        lotesDAO.listarLote(function (erro, resultado){
            var lotes = resultado.find(function(lotes){
                return lotes.cod_lote == req.params.id;
            });
            res.status(200).json(lotes);
        });

        connection.end();
    });



    //Rota usada para apagar um lote com base no ID.
    app.delete('/read/lotes/:id', function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);

        lotesDAO.apagarLote(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });    

    
    

    
//---------------Rotas de Reajuste---------------//
    
    
    //Rota para listar todos os Reajustes.
	app.get('/read/reajuste', function(req, res){
    	var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);

        lotesDAO.listarReajuste(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
    
    //Rota para gravar um novo Reajuste no Banco de Dados.
    app.post('/read/reajuste', function(req, res){
        var reajuste = req.body;
        
        var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);

        lotesDAO.salvarReajuste(reajuste, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    
    
    //Rota usada para apagar um Reajuste com base no ID.
    app.delete('/read/reajuste/:lote_cod_lote/:ano_ref', function(req, res){
        var lote_cod_lote = req.params.lote_cod_lote;
        var ano_ref = req.params.ano_ref;
        
        var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);
        

        lotesDAO.apagarReajuste(lote_cod_lote, ano_ref, function(erro, resultado){
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
    
    //Rota para listar todos os Itens.
	app.get('/read/loteItens/:id', function(req, res){
        var lote_cod_lote = req.params.id;
        
    	var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);

        lotesDAO.listarItens(lote_cod_lote, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });
        
        connection.end();
        
    });
    
    
    
    //Rota usada para atualizar vários Itens com base no ID.
    app.put('/read/loteItens', function(req, res){
        
        var itens = req.body;
        
        var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);
        
        for(var i=0; i<itens.length; i++){
            
            var lote_cod_lote = itens[i].lote_cod_lote;
            var itens_cod_item = itens[i].itens_cod_item;
            var itens_tipo_item_cod_tipo_item = itens[i].itens_tipo_item_cod_tipo_item;
            
            var loteItens = {
                lote_cod_lote : itens[i].lote_cod_lote,
                itens_cod_item : itens[i].itens_cod_item,
                itens_tipo_item_cod_tipo_item : itens[i].itens_tipo_item_cod_tipo_item,
                preco : itens[i].preco
            }
        
            lotesDAO.editarItens(lote_cod_lote, itens_cod_item, itens_tipo_item_cod_tipo_item, loteItens, function (erro, resultado){
                if (erro){
                    console.log(erro);
                    res.sendStatus(500);
                }
            });
        };
        res.sendStatus(204);
        
        connection.end();
    });
    
};