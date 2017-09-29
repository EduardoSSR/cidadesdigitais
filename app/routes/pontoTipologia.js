module.exports = function(app){

    app.post('/read/pontoTipologia', function(req, res){
        var pontoTipologia = req.body;
        
        var connection = app.infra.connectionFactory();
        var pontoTipologiaDAO = new app.infra.PontoTipologiaDAO(connection);

        pontoTipologiaDAO.salvar(pontoTipologia, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
}