module.exports = function(app){
    var api = {};
    
    //Lista todas as Categorias.
    api.listaCategoria = function (req, res){
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
    };
    
    
    //Salva uma nova Categoria no Banco de Dados.
    api.salvaCategoria = function(req, res){
    	var categoria = req.body;
        
    	var connection = app.infra.connectionFactory();
        var categoriaDAO = new app.infra.CategoriaDAO(connection);

        categoriaDAO.salvarCategoria(categoria, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
    };
    
    
    //Edita uma Categoria com base no ID.
    api.editaCategoria = function(req, res){
        var categoria = req.body;
        var id = req.body.cod_categoria;

        var connection = app.infra.connectionFactory();
        var categoriaDAO = new app.infra.CategoriaDAO(connection);
        
        categoriaDAO.editarCategoria(categoria, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Lista uma única Categoria com base no ID.
    api.listaCategoriaPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var categoriaDAO = new app.infra.CategoriaDAO(connection);

        categoriaDAO.listarCategoria(function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var categoria = resultado.find(function(categoria){
                    return categoria.cod_categoria == req.params.id;
                });
                res.status(200).json(categoria);
            }
        });

        connection.end();
    };
    
    
    //Apaga uma Categoria com base no ID.
    api.apagaCategoria = function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var categoriaDAO = new app.infra.CategoriaDAO(connection);

        categoriaDAO.apagarCategoria(id,  function(erro, resultado){
            if(erro){                                                                                     
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    return api;
};