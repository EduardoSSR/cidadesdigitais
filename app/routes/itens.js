module.exports = function(app){

    //Rota para listar todos os Itens.
    app.get('/read/itens', function (req, res){
    	var connection = app.infra.connectionFactory();
        var itensDAO = new app.infra.ItensDAO(connection);

        itensDAO.listarItens(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
        
};