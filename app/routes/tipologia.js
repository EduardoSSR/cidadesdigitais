module.exports = function (app){
    
    //Rota para listar todas as Tipologia.
    app.get('/read/tipologia', function (req, res){
    	var connection = app.infra.connectionFactory();
        var tipologiaDAO = new app.infra.TipologiaDAO(connection);

        tipologiaDAO.listar(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
}
