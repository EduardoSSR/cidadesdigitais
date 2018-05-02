module.exports = function(app){
    var api = {};
    
//---------------Callbacks de Empenho---------------//
    
    //Lista todos os Empenhos.
    api.listaEmpenho = function(req, res){
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
    };
    
    
    //Salva um novo Empenho no Banco de Dados.
    api.salvaEmpenho = function(req, res){
        var empenho = req.body;
        console.log(empenho);
        
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
    };
    
    
    //Lista um único Empenho com base no ID.
    api.listaEmpenhoPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.listarEmpenho(function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var empenho = resultado.find(function(empenho){
                    return empenho.cod_empenho == req.params.id;
                });
                res.status(200).json(empenho);                
            }
        });

        connection.end();
    };
    
    
    //Edita um Empenho com base no ID.
    api.editaEmpenho = function(req, res){
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
    };
    
    
    //Apaga um Empenho com base no ID.
    api.apagaEmpenho = function(req, res){
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
    };
    
    
//---------------Callbacks de Itens do Empenho---------------//
    
    //Lista todos os Itens do Empenho.
    api.listaEmpenhoItens = function(req, res){
        var cod_empenho = req.params.cod_empenho;
        var cod_lote = req.params.cod_lote;
        
        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);

        empenhoDAO.empenhoItens(cod_lote, cod_lote, cod_empenho, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Edita vários Items do Empenho com base no ID.
    api.editaEmpenhoItens = function(req, res){
        var itens = req.body;
        
        var connection = app.infra.connectionFactory();
        var empenhoDAO = new app.infra.EmpenhoDAO(connection);
        
        var error = false;
        var j = 0;
        
        for(var i=0; i<itens.length; i++){
            
            var cod_empenho = itens[i].cod_empenho;
            var cod_item = itens[i].cod_item;
            var cod_tipo_item = itens[i].cod_tipo_item;
            
            var itens_empenho = {
                cod_previsao_empenho : itens[i].cod_previsao_empenho,
                valor : itens[i].valor,
                quantidade : itens[i].quantidade
            }
        
            
            empenhoDAO.editarItens(itens_empenho, cod_empenho, cod_item, cod_tipo_item, function (erro, resultado){
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
            console.log(itens_empenho);
        };
        connection.end();
    };
    
    return api;
};