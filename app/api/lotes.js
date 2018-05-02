module.exports = function(app){
    var api = {};
    
//---------------Callbacks de Lotes---------------//
    
    //Lista todos os Lotes.
    api.listaLote = function(req, res){
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
    };
    
    
    //Salva um novo Lote no Banco de Dados.
    api.salvaLote = function(req, res){
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
    };
    
    
    //Lista um único Lote com base no ID.
    api.listaLotePorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);

        lotesDAO.listarLote(function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var lotes = resultado.find(function(lotes){
                    return lotes.cod_lote == req.params.id;
                });
                res.status(200).json(lotes);
            }
        });

        connection.end();
    };
    
    
    //Edita um Lote com base no ID.
    api.editaLote = function(req, res){
        var lote = req.body;
        var id = req.body.cod_lote;

        var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);
        
        lotesDAO.editarLote(lote, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Apaga um Lote com base no ID.
    api.apagaLote = function(req, res){
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
    };
    

//---------------Callbacks de Reajuste do Lote---------------//
    
    //Lista todos os Reajuste do Lote.
    api.listaReajuste = function(req, res){
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
    };
    
    
    //Salva um novo Reajuste do Lote no Banco de Dados.
    api.salvaReajuste = function(req, res){
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
    };
    
    
    //Apaga um Reajuste do Lote com base no ID.
    api.apagaReajuste = function(req, res){
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
    };
    
    
//---------------Callbacks de Itens do Lote---------------//
    
    //Lista todos os Itens do Lote.
    api.listaLoteItens = function(req, res){
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
    };
    
    
    //Edita um Item do Lote com base no ID.
    api.editaLoteItens = function(req, res){
        var itens = req.body;
        
        var connection = app.infra.connectionFactory();
        var lotesDAO = new app.infra.LotesDAO(connection);
        
        var error = false;
        var j = 0;
        
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
                    error = true;
                }
                
                j++;
                
                if(i == j){
                    if(error){
                        res.sendStatus(500);
                    }else{
                        res.sendStatus(200);
                    }
                }
            });
        };
        
        connection.end();
    };
    
    return api;
};