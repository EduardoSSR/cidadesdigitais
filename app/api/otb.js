module.exports = function(app){
    var api = {};
    
//---------------Callbacks de Pagamento---------------//
    
    //Lista todos os Pagamentos.
    api.listaPagamento = function(req, res){
    	var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);

        otbDAO.listarPagamento(function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva um novo Pagamento no Banco de Dados.
    api.salvaPagamento = function(req, res){
        var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);
        var error = false;
        var j = 0;
        
        var otb = {
            cod_otb : req.body.cod_otb,
            dt_pgto : req.body.dt_pgto
        }

        otbDAO.salvarPagamento(otb, function(erro, resultado){
            if(erro){
                console.log(erro);
                error = true;
            }
        });
        
        var num_fatura = req.body.faturas;
        
        for(var i=0; i<num_fatura.length; i++){

            var fatura_otb = {
                otb_cod_otb : req.body.cod_otb,
                fatura_num_nf : num_fatura[i].fatura_num_nf,
                fatura_cd_municipio_cod_ibge : num_fatura[i].fatura_cd_municipio_cod_ibge
            };

            otbDAO.salvarOtbFatura(fatura_otb, function(erro, resultado){
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
        };
        
        connection.end();
    };
    
    
    //Lista um único Pagamento com base no ID.
    api.listaPagamentoPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);

        otbDAO.listarPagamento(function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var otb = resultado.find(function(otb){
                    return otb.cod_otb == req.params.id;
                });
                res.status(200).json(otb);
            }
        });

        connection.end();
    };
    
    
    //Edita um Pagamento com base no ID.
    api.editaPagamento = function(req, res){
        var otb = req.body;
        var id = req.body.cod_otb;

        var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);
        
        otbDAO.editarPagamento(otb, id, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Apaga um Pagamento com base no ID.
    api.apagaPagamento = function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);

        otbDAO.apagarPagamento(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
//---------------Callbacks de Fatura do Pagamento---------------//
    
    //Lista as Faturas de um Municipio.
    api.listaMuniFatura = function(req, res){
        var cd_municipio_cod_ibge = req.params.cd_municipio_cod_ibge;
        
    	var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);

        otbDAO.listarMuniFatura(cd_municipio_cod_ibge, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    }
    
    
    //Lista as Faturas de um Pagamento
    api.listaPagamentoFatura = function(req, res){
        var cod_otb = req.params.cod_otb;
        
    	var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);

        otbDAO.listarPagFatura(cod_otb, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    }
    
    
    //Salva uma nova fatura em um Pagamento.
    api.salvaPagamentoFatura = function(req, res){
        var otb = req.body;
        var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);

        otbDAO.salvarOtbFatura(otb, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

          connection.end();
    };
    
//---------------Callbacks de Itens do Pagamento---------------//
    
    //Lista os Itens do Pagamento.
    api.listaPagamentoItens = function(req, res){
        var cod_otb = req.params.cod_otb;
        
    	var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);

        otbDAO.listarItens(cod_otb, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Edita um Item do Pagamento com base no ID.
    api.editaPagamentoItens = function(req, res){
        var itens = req.body;
        console.log(itens);
        
        var connection = app.infra.connectionFactory();
        var otbDAO = new app.infra.OtbDAO(connection);
        
        var error = false;
        var j = 0;
        
        for(var i=0; i<itens.length; i++){
            
            var otb_cod_otb = itens[i].otb_cod_otb;
            var itens_fatura_fatura_num_nf = itens[i].itens_fatura_fatura_num_nf;
            var cod_item = itens[i].cod_item;
            var cod_tipo_item = itens[i].cod_tipo_item;
            
            var otbItens = {
                otb_cod_otb : itens[i].otb_cod_otb,
                itens_fatura_fatura_num_nf : itens[i].itens_fatura_fatura_num_nf,
                cod_item : itens[i].cod_item,
                cod_tipo_item : itens[i].cod_tipo_item,
                cod_empenho : itens[i].cod_empenho,
                valor : itens[i].valor,
                quantidade : itens[i].quantidade
            }
        
            otbDAO.editarItens(otbItens, otb_cod_otb, itens_fatura_fatura_num_nf, cod_item, cod_tipo_item, function (erro, resultado){
                if (erro){
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
        };
        
        connection.end();
    };
    
    return api;
};