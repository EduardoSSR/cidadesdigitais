module.exports = function(app){

	app.get('/read/itensEmpenho', function(req, res){
        var itensEmpenho = req.body;

    	var connection = app.infra.connectionFactory();
        var itensEmpenhoDAO = new app.infra.ItensEmpenhoDAO(connection);

        itensEmpenhoDAO.listar(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });

    /*app.get('/read/itensEmpenho/:id', function(req, res){
        var itensEmpenhoID = req.params.id;
        console.log(itensEmpenhoID);
        var connection = app.infra.connectionFactory();
        var itensEmpenhoDAO = new app.infra.ItensEmpenhoDAO(connection);

        itensEmpenhoDAO.listar(itensEmpenhoID, function (erro, resultado){
            var  itensEmpenho = resultado.find(function(itensEmpenho){
                return itensEmpenho.sequencia == itensEmpenhoID;
            });
            res.status(200).json(itensEmpenho);
        });

        connection.end();
    
    });*/


    app.post('/read/itensEmpenho', function(req, res){
        var itensEmpenho = req.body;
        
        var connection = app.infra.connectionFactory();
        var itensEmpenhoDAO = new app.infra.ItensEmpenhoDAO(connection);

        itensEmpenhoDAO.salvar(itensEmpenho, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
};