module.exports = function (app){
    
    //Rota para listar todos os Processo.
    app.get('/read/processo', function (req, res){
    	var connection = app.infra.connectionFactory();
        var processoDAO = new app.infra.ProcessoDAO(connection);

        processoDAO.listar(function (erro, resultado){
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