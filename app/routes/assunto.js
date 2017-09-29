module.exports = function (app){

    //Rota para listar todos os Assuntos.
    app.get('/read/assunto', function (req, res){
    	var connection = app.infra.connectionFactory();
        var assuntosDAO = new app.infra.AssuntoDAO(connection);

        assuntosDAO.listar(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });


     
    //Rota para gravar um novo Assunto no Banco de Dados.
    app.post('/read/assunto', function(req, res){
    	var assunto = req.body;
        
    	var connection = app.infra.connectionFactory();
        var assuntosDAO = new app.infra.AssuntoDAO(connection);

        assuntosDAO.salvar(assunto, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
    });



    //Rota usada para atualizar um Assunto com base no ID.
    /*app.put('/read/assunto', function(req, res){
        var assunto = req.body;
        var id = req.body.cod_assunto;

        var connection = app.infra.connectionFactory();
        var assuntosDAO = new app.infra.AssuntoDAO(connection);
        
        assuntosDAO.editar(assunto, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });*/



    //Rota para listar um único Assunto com base no ID.
    /*app.get('/read/assunto/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var assuntosDAO = new app.infra.AssuntoDAO(connection);

        assuntosDAO.listar(function (erro, resultado){
            var assunto = resultado.find(function(assunto){
                return assunto.cod_assunto == req.params.id;
            });
            res.status(200).json(assunto);
        });

        connection.end();
    });*/



    //Rota usada para apagar um Assunto com base no ID.
    /*app.delete('/read/assunto/:id', function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var assuntosDAO = new app.infra.AssuntoDAO(connection);

        assuntosDAO.apagar(id,  function(erro, resultado){
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