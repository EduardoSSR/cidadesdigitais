module.exports = function(app){

    //Rota para listar todos os prefeitos.
	app.get('/read/prefeitos', function(req, res){
    	var connection = app.infra.connectionFactory();
        var prefeitosDAO = new app.infra.PrefeitosDAO(connection);

        prefeitosDAO.listarPrefeitos(function (erro, resultado){
            res.json(resultado);
        });

        connection.end();
    });


    //Rota para gravar um novo prefeito no Banco de Dados.
    /*app.post('/read/prefeitos', function(req, res){
    	var prefeitos = req.body;
    	
    	var connection = app.infra.connectionFactory();
        var prefeitosDAO = new app.infra.PrefeitosDAO(connection);

        prefeitosDAO.salvarPrefeitos(prefeitos, function(erro, resultado){
        	console.log(erro);
        });
    });*/

};