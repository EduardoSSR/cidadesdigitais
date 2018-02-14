module.exports = function(app){
    var api = {};
    
//---------------Callbacks de Previsao_Empenho---------------//
    
    //Lista todas as Previsao_Empenho.
    api.listaPrevisaoEmpenho = function(req, res){
    	var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);

        previsaoEmpenhoDAO.listarPrevisaoEmpenho(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva uma nova Previsao_Empenho no Banco de Dados.
    api.salvaPrevisaoEmpenho = function(req, res){
        var previsaoEmpenho = req.body;
        
        var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);

        previsaoEmpenhoDAO.salvarPrevisaoEmpenho(previsaoEmpenho, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado.insertId);
            }
        });

        connection.end();
    };
    
    
    //Lista uma única Previsao_Empenho com base no ID.
    api.listaPrevisaoEmpenhoPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);

        previsaoEmpenhoDAO.listarPrevisaoEmpenho(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var previsaoEmpenho = resultado.find(function(previsaoEmpenho){
                    return previsaoEmpenho.cod_previsao_empenho == req.params.id;
                });
                res.status(200).json(previsaoEmpenho);            
            }
        });

        connection.end();
    };
    
    
    //Edita uma Previsao_Empenho com base no ID.
    api.editaPrevisaoEmpenho = function(req, res){
        var previsaoEmpenho = req.body;
        var id = req.body.cod_previsao_empenho;

        var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);
        
        previsaoEmpenhoDAO.editarPrevisaoEmpenho(previsaoEmpenho, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Apaga uma Previsao_Empenho com base no ID.
    api.apagaPrevisaoEmpenho = function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);

        previsaoEmpenhoDAO.apagarPrevisaoEmpenho(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
//---------------Callbacks de Itens da Previsao_Empenho---------------//
    
    //Lista todos os Itens de uma Previsao_Empenho.
    api.listaPrevisaoEmpenhoItens = function(req, res){
        var cod_lote = req.params.cod_lote;
        var id = req.params.cod_previsao_empenho;
                
    	var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);

        previsaoEmpenhoDAO.listarPrevisaoEmpenhoItens(cod_lote, cod_lote, id, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Edita um Iten daPrevisao_Empenho com base no ID.
    api.editaPrevisaoEmpenhoItens = function(req, res){
        var itens = req.body;
        
        var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);
        
        var error = false;
        var j = 0;
        
        for(var i=0; i<itens.length; i++){
            
            var cod_empenho = itens[i].previsao_empenho_cod_previsao_empenho;
            var cod_item = itens[i].lote_itens_itens_cod_item;
            var cod_tipo_item = itens[i].lote_itens_itens_tipo_item_cod_tipo_item;
            
            var iPEmpenhoItens = {
                lote_itens_lote_cod_lote : itens[i].lote_itens_lote_cod_lote,
                valor : itens[i].valor,
                quantidade : itens[i].quantidade
            }
        
            previsaoEmpenhoDAO.editarItens(cod_empenho, cod_item, cod_tipo_item, iPEmpenhoItens, function (erro, resultado){
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