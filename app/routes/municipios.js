module.exports = function(app){

    //Rota para listar todos os municipios.
    app.get('/read/municipios', function(req, res){
    	var connection = app.infra.connectionFactory();
        var municipiosDAO = new app.infra.MunicipiosDAO(connection);

        municipiosDAO.listar(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });



    /*//Rota para gravar um novo municipio no Banco de Dados.
    app.post('/read/municipios', function(req, res){
        var municipio = req.body;
        
        var connection = app.infra.connectionFactory();
        var municipiosDAO = new app.infra.MunicipiosDAO(connection);

        municipiosDAO.salvar(municipio, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
    });*/



    //Rota usada para atualizar um municipio com base no ID.
    /*app.put('/read/municipios', function(req, res){
        var municipio = req.body;
        var id = req.body.cod_lote;

        var connection = app.infra.connectionFactory();
        var municipiosDAO = new app.infra.MunicipiosDAO(connection);
        
        municipiosDAO.editar(municipio, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });*/



    //Rota para listar um único municipio com base no ID.
    /*app.get('/read/municipios/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var municipiosDAO = new app.infra.MunicipiosDAO(connection);

        municipiosDAO.listar(function (erro, resultado){
            var municipio = resultado.find(function(municipio){
                return municipio.cod_ibge == req.params.id;
            });
            res.status(200).json(municipio);
        });

        connection.end();
    });*/



    //Rota usada para apagar um municipio com base no ID.
    /*app.delete('/read/municipios/:id', function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var municipiosDAO = new app.infra.MunicipiosDAO(connection);

        municipiosDAO.apagar(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });*/
    
    
};