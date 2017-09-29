module.exports = function(app){

	/*var empenho, itens, detalhesItem;

    app.post('/read/batata', function(req, res){
        var idLote = req.body.cod_lote;

        var connection = app.infra.connectionFactory();
        var pesquisaFaturaDAO = new app.infra.PesquisaFaturaDAO(connection);

        pesquisaFaturaDAO.procurarEmpenho(idLote, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                empenho = resultado;
                res.sendStatus(200);
            }
        });

        connection.end();
    });


    app.get('/read/batata', function(req, res){
        res.status(200).json(empenho);
    });	




    app.post('/read/batata2', function(req, res){
        var idEmpenho = req.body.cod_empenho;

        var connection = app.infra.connectionFactory();
        var pesquisaFaturaDAO = new app.infra.PesquisaFaturaDAO(connection);

        pesquisaFaturaDAO.procurarItens(idEmpenho, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                itens = resultado;
                res.sendStatus(200);
            }
        });

        connection.end();
    });

    app.get('/read/batata2', function(req, res){
        res.status(200).json(itens);
    });




    app.post('/read/batata3', function(req, res){
        var idItem = req.body.lote_itens_lote_cod_lote;

        var connection = app.infra.connectionFactory();
        var pesquisaFaturaDAO = new app.infra.PesquisaFaturaDAO(connection);

        pesquisaFaturaDAO.detalhesItens(idItem, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                detalhesItem = resultado;
                res.sendStatus(200);
            }
        });

        connection.end();
    });

    app.get('/read/batata3', function(req, res){
        res.status(200).json(detalhesItem);
    });*/


};