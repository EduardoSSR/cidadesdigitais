module.exports = function (app){
    
    app.get('/read/categoria', function (req, res){
    	var connection = app.infra.connectionFactory();
        var categoriaDAO = new app.infra.CategoriaDAO(connection);

        categoriaDAO.listar(function (erro, resultado){
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