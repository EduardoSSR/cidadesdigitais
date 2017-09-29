module.exports = function(app){

    //Rota para listar todos os Itens.
	app.get('/read/itens/:id', function(req, res){
        var lote_cod_lote = req.params.id;
        
    	var connection = app.infra.connectionFactory();
        var itensDAO = new app.infra.ItensDAO(connection);

        itensDAO.listaItens(lote_cod_lote, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(418);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    

    //Rota usada para atualizar vários Itens com base no ID.
    app.put('/read/itens', function(req, res){
        
        var itens = req.body;
        console.log(itens);
        
        /*var connection = app.infra.connectionFactory();
        var itensDAO = new app.infra.ItensDAO(connection);
        
        for(var i=0; i<=itens.length; i++){
            
            itensDAO.editar(itens[i], function (erro, resultado){
                if (erro){
                    console.log(erro);
                    res.sendStatus(500);
                }else{
                    res.sendStatus(204);
                }
            });
        };
        connection.end();*/
    });
        
        
};