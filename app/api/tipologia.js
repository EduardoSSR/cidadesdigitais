module.exports = function(app){
    var api = {};
    
    //Lista todas as Tipologias.
    api.listaTipologia = function (req, res){
    	var connection = app.infra.connectionFactory();
        var tipologiaDAO = new app.infra.TipologiaDAO(connection);

        tipologiaDAO.listarTipologia(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva uma nova Tipologia no Banco de Dados.
    api.salvaTipologia = function(req, res){
    	var tipologia = req.body;
        
    	var connection = app.infra.connectionFactory();
        var tipologiaDAO = new app.infra.TipologiaDAO(connection);

        tipologiaDAO.salvarTipologia(tipologia, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
       
       connection.end();
    };
    
    
    //Lista uma única Tipologia com base no ID.
    api.listaTipologiaPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var tipologiaDAO = new app.infra.TipologiaDAO(connection);

        tipologiaDAO.listarTipologia(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var tipologia = resultado.find(function(tipologia){
                    return tipologia.cod_tipologia == req.params.id;
                });
                res.status(200).json(tipologia);            
            }
        });

        connection.end();
    };
    
    
    //Edita uma Tipologia com base no ID.
    api.editaTipologia = function(req, res){
        var tipologia = req.body;
        var id = req.body.cod_tipologia;

        var connection = app.infra.connectionFactory();
        var tipologiaDAO = new app.infra.TipologiaDAO(connection);
        
        tipologiaDAO.editarTipologia(tipologia, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Apaga uma Tipologia com base no ID.
    api.apagaTipologia = function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var tipologiaDAO = new app.infra.TipologiaDAO(connection);

        tipologiaDAO.apagarTipologia(id,  function(erro, resultado){
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