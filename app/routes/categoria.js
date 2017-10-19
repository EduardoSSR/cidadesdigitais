module.exports = function (app){
    
    //Rota para listar todas as Categorias.
    app.get('/read/categoria', function (req, res){
    	var connection = app.infra.connectionFactory();
        var categoriaDAO = new app.infra.CategoriaDAO(connection);

        categoriaDAO.listarCategoria(function (erro, resultado){
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