module.exports = function(app){


    //Rota para listar todos os pagamentos.
	app.get('/read/otb', function(req, res){
    	var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);

        otbDAO.listar(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });



    //Rota para gravar um novo pagamento no Banco de Dados.
    app.post('/read/otb', function(req, res){
        var otb = req.body;
        
        var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);

        otbDAO.salvar(otb, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });



    //Rota usada para atualizar um pagamento com base no ID.
    /*app.put('/read/otb', function(req, res){
        var otb = req.body;
        var id = req.body.cod_lote;

        var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);
        
        otbDAO.editar(otb, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });*/



    //Rota para listar um único pagamento com base no ID.
    /*app.get('/read/otb/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);

        otbDAO.listar(function (erro, resultado){
            var otb = resultado.find(function(otb){
                return otb.cod_otb == req.params.id;
            });
            res.status(200).json(otb);
        });

        connection.end();
    });*/



    //Rota usada para apagar um pagamento com base no ID.
    app.delete('/read/otb/:id', function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);

        otbDAO.apagar(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });


}