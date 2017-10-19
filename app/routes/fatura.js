module.exports = function(app){

    //Rota para listar todas as faturas.
	app.get('/read/fatura', function(req, res){
    	var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.listarFatura(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });


    //Lista todos os itens de uma Fatura com base no Id
    /*app.get('/read/faturaItens/:id', function(req, res){
        var idFatura = req.params.id;

        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.listarItensFatura(idFatura, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
*/


    //Rota para gravar uma nova fatura no Banco de Dados.
    app.post('/read/fatura', function(req, res){
        var fatura = req.body;
        
        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.salvarFatura(fatura, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });



    //Rota usada para atualizar uma fatura com base no ID.
    /*app.put('/read/fatura', function(req, res){
        var fatura = req.body;
        var id = req.body.num_nf;

        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);
        
        faturaDAO.editarFatura(fatura, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });*/



    //Rota para listar uma única fatura com base no ID.
    app.get('/read/fatura/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.listarFatura(function (erro, resultado){
            var fatura = resultado.find(function(fatura){
                return fatura.num_nf == req.params.id;
            });
            res.status(200).json(fatura);
        });

        connection.end();
    });



    //Rota usada para apagar uma fatura com base no ID.
    /*app.delete('/read/fatura/:id', function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.apagarFatura(id,  function(erro, resultado){
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