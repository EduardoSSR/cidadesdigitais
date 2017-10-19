module.exports = function(app){

    //Rota para listar todas as Natureza Despesa.
    app.get('/read/naturezaDespesa', function(req, res){
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
    });
    
};