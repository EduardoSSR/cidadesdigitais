module.exports = function(app){
    var api = {};
    
    //Lista todos os Itens.
    api.listaItens = function (req, res){
    	var connection = app.infra.connectionFactory();
        var itensDAO = new app.infra.ItensDAO(connection);

        itensDAO.listarItens(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva um novo Item no Banco de Dados.
    api.salvaItens = function(req, res){
    	var item = req.body;
        
    	var connection = app.infra.connectionFactory();
        var itensDAO = new app.infra.ItensDAO(connection);

        itensDAO.salvarItens(item, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
        
        connection.end();
    };
    
    
    //Lista um único Item com base no ID.
    api.listaItensPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var itensDAO = new app.infra.ItensDAO(connection);

        itensDAO.listarItens(function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var item = resultado.find(function(item){
                    return item.cod_item == req.params.cod_item && item.tipo_item_cod_tipo_item == req.params.cod_tipo_item;
                });
                res.status(200).json(item);
            }
        });

        connection.end();
    };
    
    
    
    //Edita um Item com base no ID.
    api.editaItens = function(req, res){
        var item = req.body;
        var cod_item = req.body.cod_item;
        var cod_tipo_item = req.body.tipo_item_cod_tipo_item;

        var connection = app.infra.connectionFactory();
        var itensDAO = new app.infra.ItensDAO(connection);
        
        itensDAO.editarItens(item, cod_item, cod_tipo_item, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    }
    
    
    //Apaga um Item com base no ID.
    api.apagaItens = function(req, res){
        var cod_item = req.params.cod_item;
        var cod_ipo_item = req.params.cod_tipo_item;

        var connection = app.infra.connectionFactory();
        var itensDAO = new app.infra.ItensDAO(connection);

        itensDAO.apagarItens(cod_item, cod_ipo_item,  function(erro, resultado){
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