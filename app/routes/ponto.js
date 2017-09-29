module.exports = function (app){

    //Rota para listar todos os Usuários.
    app.get('/read/ponto', function (req, res){
    	var connection = app.infra.connectionFactory();
        var pontoDAO = new app.infra.PontoDAO(connection);

        pontoDAO.listar(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
    
    //Rota para gravar um novo ponto no Banco de Dados.
    app.post('/read/ponto', function(req, res){
        var connection = app.infra.connectionFactory();
        var pontoDAO = new app.infra.PontoDAO(connection);
        
        var ponto = {
            cod_ponto : req.body.cod_ponto,
            categoria_cod_categoria : req.body.categoria_cod_categoria,
            cd_municipio_cod_ibge : req.body.cd_municipio_cod_ibge,
            nome : req.body.nome,
            endereco : req.body.endereco,
            numero : req.body.numero,
            bairro : req.body.bairro,
            cep : req.body.cep,
            latitude : req.body.latitude,
            longitude : req.body.latitude
        }

        pontoDAO.salvar(ponto, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }
        });

        var ponto_tipologia = req.body.cod_tipologia;
        for(var i=0; i<ponto_tipologia.length; i++){

            var cod_tipologia = {
                ponto_cod_ponto : req.body.cod_ponto,
                ponto_categoria_cod_categoria : req.body.categoria_cod_categoria,
                ponto_cd_municipio_cod_ibge : req.body.cd_municipio_cod_ibge,
                tipologia_cod_tipologia : ponto_tipologia[i]
            };

            pontoDAO.salvarPT(cod_tipologia, function(erro, resultado){
                if(erro){
                    console.log(erro);
                    res.sendStatus(500);
                }
            });

        };
        
        res.sendStatus(204);
        connection.end();
    });
}