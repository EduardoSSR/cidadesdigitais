module.exports = function(app){
    var api ={};
    
    //Lista todas as Natureza_Despesa.
    api.listaNaturezaDespesa = function(req, res){
        var connection = app.infra.connectionFactory();
        var naturezaDespesaDAO = new app.infra.NaturezaDespesaDAO(connection);

        naturezaDespesaDAO.listarNaturezaDespesa(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva uma nova Natureza_Despesa no Banco de Dados.
    api.salvaNaturezaDespesa = function(req, res){
    	var naturezaDespesa = req.body;
        
    	var connection = app.infra.connectionFactory();
        var naturezaDespesaDAO = new app.infra.NaturezaDespesaDAO(connection);

        naturezaDespesaDAO.salvarNaturezaDespesa(naturezaDespesa, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });
    };
    
    
    //Lista uma única Natureza_Despesa com base no ID.
    api.listaNaturezaDespesaPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var naturezaDespesaDAO = new app.infra.NaturezaDespesaDAO(connection);

        naturezaDespesaDAO.listarNaturezaDespesa(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var naturezaDespesa = resultado.find(function(naturezaDespesa){
                    return naturezaDespesa.cod_natureza_despesa == req.params.id;
                });
                res.status(200).json(naturezaDespesa);            
            }
        });

        connection.end();
    };
    
    
    //Edita uma Natureza_Despesa com base no ID.
    api.editaNaturezaDespesa = function(req, res){
        var naturezaDespesa = req.body;
        var cod_naturaza_despesa = req.body.cod_naturaza_despesa;

        var connection = app.infra.connectionFactory();
        var naturezaDespesaDAO = new app.infra.NaturezaDespesaDAO(connection);
        
        naturezaDespesaDAO.editarNaturezaDespesa(naturezaDespesa, cod_natureza_despesa, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    }
    
    
    //Apaga uma Natureza_Despesa com base no ID.
    api.apagaNaturezaDespesa = function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var naturezaDespesaDAO = new app.infra.NaturezaDespesaDAO(connection);

        naturezaDespesaDAO.apagarNaturezaDespesa(id, function(erro, resultado){
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