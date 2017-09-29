module.exports = function(app){

    //Rota para listar todas as Entidades.
    app.get('/read/entidades', function(req, res){
        var connection = app.infra.connectionFactory();
        var entidadesDAO = new app.infra.EntidadesDAO(connection);

              entidadesDAO.listar(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    


    //Rota para gravar uma nova Entidade no Banco de Dados.
    app.post('/read/entidades', function(req, res){
        var entidade = req.body;
        
        var connection = app.infra.connectionFactory();
        var entidadesDAO = new app.infra.EntidadesDAO(connection);

        entidadesDAO.salvar(entidade, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    


    //Rota usada para atualizar uma Entidade com base no ID.
    app.put('/read/entidades', function(req, res){
        var entidade = req.body;
        var id = req.body.cnpj;
        
        var connection = app.infra.connectionFactory();
        var entidadesDAO = new app.infra.EntidadesDAO(connection);
        
        entidadesDAO.editar(entidade, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
    });



    //Rota para listar uma única Entidade com base no ID.
    app.get('/read/entidades/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var entidadesDAO = new app.infra.EntidadesDAO(connection);

        entidadesDAO.listar(function (erro, resultado){
            var entidade = resultado.find(function(entidade){
                return entidade.cnpj == req.params.id;
            });
            res.status(200).json(entidade);
        });

        connection.end();
    });

    

    //Rota usada para apagar um assunto com base no ID.
    app.delete('/read/entidades/:id', function(req, res){
        var id = req.params.id;
        
        var connection = app.infra.connectionFactory();
        var entidadesDAO = new app.infra.EntidadesDAO(connection);

        entidadesDAO.apagar(id, function(erro, resultado){
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