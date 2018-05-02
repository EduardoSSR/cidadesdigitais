module.exports = function(app){
    var api ={};
    
//---------------Callbacks de Fatura---------------//
    
    //Lista todas as Faturas.
    api.listaFatura = function(req, res){
    	var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.listarFatura(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva uma nova Fatura no Banco de Dados.
    api.salvaFatura = function(req, res){
        var fatura = req.body;
        
        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.salvarFatura(fatura, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Lista uma única Fatura com base no ID.
    api.listaFaturaPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.listarFatura(function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var fatura = resultado.find(function(fatura){
                    return ((fatura.num_nf == req.params.num_nf) && (fatura.cd_municipio_cod_ibge == req.params.cod_ibge));
                });
                res.status(200).json(fatura);
            }
        });

        connection.end();
    };
    
    
    //Apaga uma Fatura com base no ID.
    api.apagaFatura = function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.apagarFatura(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
//---------------Callbacks de Itens da Fatura---------------//
    
    //Lista todos os Itens da Fatura.
    api.listaFaturaItens = function(req, res){
        var num_nf = req.params.num_nf;
        var cod_ibge = req.params.cod_ibge;
        
        console.log(num_nf, cod_ibge);
        
    	var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.listarItensFatura(cod_ibge, cod_ibge, num_nf, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                console.log(resultado);
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva um novo Item da Fatura no Banco de Dados.
    api.salvaFaturaItens = function(req, res){
        var item_fatura = req.body;
        
        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.salvarItensFatura(item_fatura, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Lista um único Item da Fatura com base no ID.
    api.listaFaturaItensPorId = function(req, res){
        var cod_ibge = req.params.municipio_cod_ibge;
        var cod_natureza_despesa = req.params.natureza_despesa_cod_natureza_despesa;
        var cod_item = req.params.cod_item;
        var cod_tipo_item = req.params.cod_tipo_item;

        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.listarFaturaItensPorId(cod_ibge, cod_natureza_despesa, cod_item, cod_tipo_item, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Edita um Item da Fatura com base no ID.
    api.editaFaturaItens = function(req, res){
        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);
        
        var error = false;
        var j = 0;
        
        var itens_fatura = req.body;
        for(var i=0; i<itens_fatura.length; i++){
            
            var fatura_num_nf = itens_fatura[i].fatura_num_nf;
            var cod_empenho = itens_fatura[i].cod_empenho;
            var cod_item = itens_fatura[i].cod_item;
            var cod_tipo_item = itens_fatura[i].cod_tipo_item;
            var cod_ibge = itens_fatura[i].cod_ibge;
            
            faturaDAO.editarItensFatura(itens_fatura[i], fatura_num_nf, cod_empenho, cod_item, cod_tipo_item, cod_ibge, function (erro, resultado){
                if(erro){
                    console.log(erro);
                    error = true;
                }
                
                j++;
                
                if(i == j){
                    if(error){
                        res.sendStatus(500);
                    }else{
                        res.sendStatus(200);
                    }
                }
            });

        }
        

        connection.end();
    };
    
    
    //Apaga um Item da Fatura com base no ID.
    api.apagaFaturaItens = function(req, res){
        var fatura_num_nf = req.params.fatura_num_nf;
        var cod_empenho = req.params.cod_empenho;
        var cod_item = req.params.cod_item;
        var cod_tipo_item = req.params.cod_tipo_item;
        var cod_ibge = req.params.cod_ibge;

        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.apagarItensFatura(fatura_num_nf, cod_empenho, cod_item, cod_tipo_item, cod_ibge, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
//---------------Callbacks de Pagamentos da Fatura---------------//
    
    //Lista todos os Pagamentos da Fatura.
    api.listaPagamentoFatura = function(req, res){
        var num_nf = req.params.num_nf;
        var cod_ibge = req.params.cod_ibge;

        var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.listarOtb(num_nf, cod_ibge, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
//---------------Callbacks de Total Fatura---------------//
    //Lista o total da fatura.
    api.totalFatura = function(req, res){
        var num_nf = req.params.num_nf;
        
    	var connection = app.infra.connectionFactory();
        var faturaDAO = new app.infra.FaturaDAO(connection);

        faturaDAO.totalFatura(num_nf, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    return api;
};