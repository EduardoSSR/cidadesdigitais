module.exports = function(app){
    var api = {};
    
    //Lista todos os Tipos dos Itens.
    api.listaTipoItem = function (req, res){
    	var connection = app.infra.connectionFactory();
        var tipoItemDAO = new app.infra.TipoItemDAO(connection);

        tipoItemDAO.listarTipoItem(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva um novo Tipo do Item no Banco de Dados.
    api.salvaTipoItem = function(req, res){
        var tipoItem = req.body;
        
        var connection = app.infra.connectionFactory();
        var tipoItemDAO = new app.infra.TipoItemDAO(connection);

        tipoItemDAO.salvarTipoItem(tipoItem, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
            }
        });

        connection.end();
    };
    
    
    //Lista um único Tipo do Item com base no ID.
    api.listaTipoItemPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var tipoItemDAO = new app.infra.TipoItemDAO(connection);

        tipoItemDAO.listarTipoItem(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var tipoItem = resultado.find(function(tipoItem){
                    return tipoItem.cod_tipo_item == req.params.cod_tipo_item;
                });
                res.status(200).json(tipoItem);
            }
        });

        connection.end();
    };
    
    
    //Edita um Tipo do Item com base no ID.
    api.editaTipoItem = function(req, res){
        var tipoItem = req.body;
        var cod_tipo_item = req.body.cod_tipo_item;

        var connection = app.infra.connectionFactory();
        var tipoItemDAO = new app.infra.TipoItemDAO(connection);
        
        tipoItemDAO.editarTipoItem(tipoItem, cod_tipo_item, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Apaga um Tipo do Item com base no ID.
    api.apagaTipoItem = function(req, res){
        var cod_tipo_item = req.params.cod_tipo_item;
        
        var connection = app.infra.connectionFactory();
        var tipoItemDAO = new app.infra.TipoItemDAO(connection);

        tipoItemDAO.apagarTipoItem(cod_tipo_item,  function(erro, resultado){
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