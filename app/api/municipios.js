module.exports = function(app){
    var api = {};
    
    //Lista todos os Municipios.
    api.listaMunicipio = function(req, res){
    	var connection = app.infra.connectionFactory();
        var municipiosDAO = new app.infra.MunicipiosDAO(connection);

        municipiosDAO.listarMunicipio(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva um novo Municipio no Banco de Dados.
    api.salvaMunicipio = function(req, res){
        var municipio = req.body;
        
        var connection = app.infra.connectionFactory();
        var municipiosDAO = new app.infra.MunicipiosDAO(connection);

        municipiosDAO.salvarMunicipio(municipio, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
    };
    
    
    //Lista um único Municipio com base no ID.
    api.listaMunicipioPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var municipiosDAO = new app.infra.MunicipiosDAO(connection);

        municipiosDAO.listarMunicipio(function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var municipio = resultado.find(function(municipio){
                    return municipio.cod_ibge == req.params.id;
                });
                res.status(200).json(municipio);
            }
        });

        connection.end();
    };
    
    
    //Edita um Municipio com base no ID.
    api.editaMunicipio = function(req, res){
        var municipio = req.body;
        var id = req.body.cod_lote;

        var connection = app.infra.connectionFactory();
        var municipiosDAO = new app.infra.MunicipiosDAO(connection);
        
        municipiosDAO.editarMunicipio(municipio, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Apaga um Municipio com base no ID.
    api.apagaMunicipio = function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var municipiosDAO = new app.infra.MunicipiosDAO(connection);

        municipiosDAO.apagarMunicipio(id,  function(erro, resultado){
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