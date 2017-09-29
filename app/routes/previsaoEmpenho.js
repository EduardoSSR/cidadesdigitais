module.exports = function(app){

    //Rota para listar todas as Previsões de Empenho.
	app.get('/read/previsaoEmpenho', function(req, res){
    	var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);

        previsaoEmpenhoDAO.listar(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });



    //Rota para gravar uma nova Previsão de Empenho no Banco de Dados.
    app.post('/read/previsaoEmpenho', function(req, res){
        var previsaoEmpenho = req.body;
        console.log(previsaoEmpenho);
        
        var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);

        previsaoEmpenhoDAO.salvar(previsaoEmpenho, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });



    //Rota usada para atualizar uma Previsão de Empenho com base no ID.
    /*app.put('/read/previsaoEmpenho', function(req, res){
        var previsaoEmpenho = req.body;
        var id = req.body.cod_previsao_empenho;

        var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);
        
        previsaoEmpenhoDAO.editar(previsaoEmpenho, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });*/



    //Rota para listar uma única Previsão de Empenho com base no ID.
    app.get('/read/previsaoEmpenho/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);

        previsaoEmpenhoDAO.listar(function (erro, resultado){
            var previsaoEmpenho = resultado.find(function(previsaoEmpenho){
                return previsaoEmpenho.cod_previsao_empenho == req.params.id;
            });
            res.status(200).json(previsaoEmpenho);
        });

        connection.end();
    });



    //Rota usada para apagar uma Previsão de Empenho com base no ID.
    /*app.delete('/read/previsaoEmpenho/:id', function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var previsaoEmpenhoDAO = new app.infra.PrevisaoEmpenhoDAO(connection);

        previsaoEmpenhoDAO.apagar(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });*/

}