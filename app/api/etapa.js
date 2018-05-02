module.exports = function(app){
    var api ={};
    
    //Lista todas as Etapas.
    api.listaEtapa = function (req, res){
    	var connection = app.infra.connectionFactory();
        var etapaDAO = new app.infra.EtapaDAO(connection);

        etapaDAO.listarEtapa(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva uma nova Etapa no Banco de Dados.
    api.salvaEtapa = function(req, res){
        var etapa = req.body;
        
        var connection = app.infra.connectionFactory();
        var etapaDAO = new app.infra.EtapaDAO(connection);

        etapaDAO.salvarEtapa(etapa, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200);
            }
        });

        connection.end();
    };
    
    
    //Lista uma única Etapa com base no ID.
    api.listaEtapaPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var etapaDAO = new app.infra.EtapaDAO(connection);

        etapaDAO.listarEtapa(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var etapa = resultado.find(function(etapa){
                    return etapa.cod_etapa == req.params.cod_etapa;
                });
                res.status(200).json(etapa);
            }
        });

        connection.end();
    };
    
    
    //Edita uma Etapa com base no ID.
    api.editaEtapa = function(req, res){
        var etapa = req.body;
        var cod_etapa = req.body.cod_etapa;

        var connection = app.infra.connectionFactory();
        var etapaDAO = new app.infra.EtapaDAO(connection);
        
        etapaDAO.editarEtapa(etapa, cod_etapa, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Apaga uma Etapa com base no ID.
    api.apagaEtapa = function(req, res){
        var cod_etapa = req.params.cod_etapa;
        
        var connection = app.infra.connectionFactory();
        var etapaDAO = new app.infra.EtapaDAO(connection);

        etapaDAO.apagarEtapa(cod_etapa,  function(erro, resultado){
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