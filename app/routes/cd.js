module.exports = function(app){
    
//---------------Rotas de Estado---------------//
    
    //Json de Estados com uf e nome do estado.
    var estado = [{ uf: 'AC', nome: 'Acre'}, { uf: 'AL', nome: 'Alagoas'}, { uf: 'AM', nome: 'Amazonas'}, { uf: 'AP', nome: 'Amapá'}, { uf: 'BA', nome: 'Bahia'}, { uf: 'CE', nome: 'Ceará'}, { uf: 'DF', nome: 'Distrito Federal'}, { uf: 'ES', nome: 'Espírito Santo'}, { uf: 'GO', nome: 'Goiás'}, { uf: 'MA', nome: 'Maranhão'}, { uf: 'MT', nome: 'Mato Grosso'}, { uf: 'MS', nome: 'Mato Grosso do Sul'}, { uf: 'MG', nome: 'Minas Gerais'}, { uf: 'PA', nome: 'Pará'}, { uf: 'PB', nome: 'Paraíba'}, { uf: 'PR', nome: 'Paraná'}, { uf: 'PE', nome: 'Pernambuco'}, { uf: 'PI', nome: 'Piauí'}, { uf: 'RJ', nome: 'Rio de Janeiro'}, { uf: 'RN', nome: 'Rio Grande do Norte'}, { uf: 'RS', nome: 'Rio Grande do Sul'}, { uf: 'RO', nome: 'Rondônia'}, { uf: 'RR', nome: 'Roraima'}, { uf: 'SC', nome: 'Santa Catarina'}, { uf: 'SP', nome: 'São Paulo'}, { uf: 'SE', nome: 'Sergipe'}, { uf: 'TO', nome: 'Tocantins'}];
    
    
    //Retorna todos os Estados com suas respectivas UFs.
    app.get('/read/cd/estado', function(req, res){
        res.status(200).json(estado);
    });
    
    
    
    
//---------------Rotas de Municipios---------------// 
    
    //Rota lista todos os municipios e seus respectivos codigos ibge de acordo com a uf recebida.
    app.get('/read/cd/municipio/:uf', function(req, res){
        var uf = req.params.uf;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarMunicipios(uf,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
    
    
//---------------Rotas de Cidades Digitais---------------//

	//Rota para listar todas as Cidades Digitais.
	app.get('/read/cd', function (req, res){
    	var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarCidadesDigitais(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });

    

    //Rota para gravar um novo Cd no Banco de Dados.
    app.post('/read/cd', function(req, res){
        var cd = req.body;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.salvarCidadesDigitais(cd, function(erro, resultado){
            if(erro){
                console.log(erro);
                var msgErro = {msg: 'Ocorreu um erro com o Banco de Dados.'};
                res.status(418).json(msgErro);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });


    
    //Rota usada para atualizar uma cidade digital com base no codigo ibge.
    app.put('/read/cd', function(req, res){
        var cd = req.body;
        var cod_ibge = req.body.municipio_cod_ibge;

        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        cdDAO.editarCidadesDigitais(cd, cod_ibge, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    
    
    
    //Rota para listar a Cidade Digital e o nome do municipio respectivo.
    app.get('/read/cd/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarCidadesDigitais(function (erro, resultado){
            var cd = resultado.find(function(cd){
                return cd.municipio_cod_ibge == req.params.id;
            });
            
            for(var i = 0; i < estado.length; i++){
                if(estado[i].uf == cd.uf){
                    var result = {
                        municipio_cod_ibge : cd.municipio_cod_ibge,
                        lote_cod_lote : cd.lote_cod_lote,
                        os_pe : cd.os_pe,
                        os_imp : cd.os_imp,
                        nome_municipio : cd.nome_municipio,
                        uf : cd.uf,
                        nome_estado : estado[i].nome
                    }
                    break;
                }
            }
            
            res.status(200).json(result);
        });

        connection.end();
    });

    

    //Rota usada para apagar um cd com base no ID.
    app.delete('/read/cd/:id', function(req, res){
        var id = req.params.id;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.apagarCidadesDigitais(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    
    
    
    
    
//---------------Rotas de Itens---------------//
    
    //Rota para listar todos os itens das cidades digitais com base no codigo ibge.
    app.get('/read/cdItens/:id', function(req, res){
        var cod_ibge = req.params.id;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarItens(cod_ibge, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
    
    //Rota usada para atualizar os itens da cidade digital.
    app.put('/read/cdItens', function(req, res){
        var cdItens = req.body;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        for(var i=0; i<cdItens.length; i++){
            
            var cdItem = {
                cd_municipio_cod_ibge : cdItens[i].cd_municipio_cod_ibge,
                itens_cod_item : cdItens[i].itens_cod_item,
                itens_tipo_item_cod_tipo_item : cdItens[i].itens_tipo_item_cod_tipo_item,
                quantidade_previsto : cdItens[i].quantidade_previsto,
                quantidade_projeto_executivo : cdItens[i].quantidade_projeto_executivo,
                quantidade_termo_instalacao : cdItens[i].quantidade_termo_instalacao
            };
            
            var cod_ibge = cdItens[i].cd_municipio_cod_ibge;
            var cod_itens = cdItens[i].itens_cod_item;
            var cod_tipo_item = cdItens[i].itens_tipo_item_cod_tipo_item;
            
            cdDAO.editarItens(cdItem, cod_ibge, cod_itens, cod_tipo_item, function (erro, resultado){
                if (erro){
                    console.log(erro);
                    res.sendStatus(500);
                }
            });
        }
        res.sendStatus(204);
        
        connection.end();
    });
    
    
    
    
        
//---------------Rotas de Processo---------------//
    
    //Rota para listar todos os Processo.
    app.get('/read/processo', function (req, res){
    	var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarProcesso(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
    
    //Rota para gravar um novo Processo no Banco de Dados.
    app.post('/read/processo', function(req, res){
        var processo = req.body;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.salvarProcesso(processo, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    


    //Rota usada para atualizar um Processo com base nos IDs.
    app.put('/read/processo', function(req, res){
        var processo = req.body;
        var cod_processo = req.body.cod_processo;
        var cd_municipio_cod_ibge = req.body.cd_municipio_cod_ibge;

        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        cdDAO.editarProcesso(processo, cod_processo, cd_municipio_cod_ibge, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });



    //Rota para listar um único Processo com base nos IDs.
    app.get('/read/processo/:cod_processo/:cd_municipio_cod_ibge', function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarProcesso(function (erro, resultado){
            var processo = resultado.find(function(processo){
                return processo.cod_processo == req.params.cod_processo && processo.cd_municipio_cod_ibge == req.params.cd_municipio_cod_ibge;
            });
            res.status(200).json(processo);
        });

        connection.end();
    });



    //Rota usada para apagar um Processo com base nos IDs.
    app.delete('/read/processo/:cod_processo/:cd_municipio_cod_ibge', function(req, res){
        var cod_processo = req.params.cod_processo;
        var cd_municipio_cod_ibge = req.params.cd_municipio_cod_ibge;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.apagarProcesso(cod_processo, cd_municipio_cod_ibge, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    
    
    
    
    
//---------------Rotas de Acompanhamento---------------//
    
    //Rota para listar todas as uacom (Acompanhamentos).
    app.get('/read/acompanhamento', function (req, res){
    	var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarAcompanhamento(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
    //Teste
    /*app.get('/read/teste', function (req, res){
    	var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        var teste = new Array();
        var assunto = new Array();

        cdDAO.listarTeste(function (erro, resultado){
            for(var i = 0; i<resultado.length; i++){
                
                var cod_assunto = resultado[i].cod_assunto.split(",");
                var descricao = resultado[i].descricao.split(",");
                
                for(var j=0; j<cod_assunto.length; j++){
                    assunto[j] = {
                        cod_assunto : cod_assunto[j],
                        descricao : descricao[j]
                    }
                }
                
                teste[i] = {
                    cd_municipio_cod_ibge : resultado[i].cd_municipio_cod_ibge,
                    data : resultado[i].data,
                    relato : resultado[i].relato,
                    cod_assunto : resultado[i].cod_assunto.split(","),
                    descricao : resultado[i].descricao.split(",")
                }
            }
            
            res.status(200).json(teste);
            
        });
        
        connection.end();
    });*/
    
    
    
    //Rota para gravar um novo uacom (Acompanhamento) no Banco de Dados.
    app.post('/read/acompanhamento', function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        var uacom = {
            cd_municipio_cod_ibge : req.body.cd_municipio_cod_ibge,
            data : req.body.data,
            relato : req.body.relato,
            titulo : req.body.titulo
        }

        cdDAO.salvarAcompanhamento(uacom, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }
        });

        var cod_assunto = req.body.uacom_cod;
        for(var i=0; i<cod_assunto.length; i++){

            var uacom_assunto = {
                uacom_cd_municipio_cod_ibge : req.body.cd_municipio_cod_ibge,
                uacom_data : req.body.data,
                assunto_cod_assunto : cod_assunto[i]
            };

            cdDAO.salvarUacomAssun(uacom_assunto, function(erro, resultado){
                if(erro){
                    console.log(erro);
                    res.sendStatus(500);
                }
            });

        };
        
        res.sendStatus(204);
        connection.end();
    });
    
    
    
    
    
//---------------Rotas de Ponto---------------//
    
    //Rota para listar todos os Pontos.
    app.get('/read/ponto', function (req, res){
    	var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarPonto(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
    
    //Rota para gravar um novo Ponto no Banco de Dados.
    app.post('/read/ponto', function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
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

        cdDAO.salvarPonto(ponto, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }
        });

        var cod_tipologia = req.body.cod_tipologia;
        for(var i=0; i<cod_tipologia.length; i++){

            var ponto_tipologia = {
                ponto_cod_ponto : req.body.cod_ponto,
                ponto_categoria_cod_categoria : req.body.categoria_cod_categoria,
                ponto_cd_municipio_cod_ibge : req.body.cd_municipio_cod_ibge,
                tipologia_cod_tipologia : cod_tipologia[i]
            };

            cdDAO.salvarPontoTipo(ponto_tipologia, function(erro, resultado){
                if(erro){
                    console.log(erro);
                    res.sendStatus(500);
                }
            });

        };
        
        res.sendStatus(204);
        connection.end();
    });
    
    
    
    //Rota usada para atualizar um Ponto com base nos IDs.
    /*app.put('/read/ponto', function(req, res){
        var cod_ponto = req.body.cod_ponto;
        var cod_categoria = req.body.categoria_cod_categoria;
        var cod_ibge = req.body.cd_municipio_cod_ibge;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
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
        
        cdDAO.editarPonto(ponto, cod_ponto, cod_categoria, cod_ibge, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }
        });
        
        var cod_tipologia = req.body.cod_tipologia;
        for(var i=0; i<cod_tipologia.length; i++){
            
            var tipologia_cod_tipologia = cod_tipologia[i];

            var ponto_tipologia = {
                ponto_cod_ponto : req.body.cod_ponto,
                ponto_categoria_cod_categoria : req.body.categoria_cod_categoria,
                ponto_cd_municipio_cod_ibge : req.body.cd_municipio_cod_ibge,
                tipologia_cod_tipologia : cod_tipologia[i]
            };

            cdDAO.editarPontoTipo(ponto_tipologia, cod_ponto, cod_categoria, cod_ibge, tipologia_cod_tipologia, function(erro, resultado){
                if(erro){
                    console.log(erro);
                    res.sendStatus(500);
                }
            });
        }
        
        connection.end();
    });*/
    
    
    
    //Rota para listar um único Ponto com base nos IDs.
    app.get('/read/ponto/:cod_ponto/:categoria_cod_categoria/:cd_municipio_cod_ibge', function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        var cod_ponto = req.params.cod_ponto;
        var categoria_cod_categoria = req.params.categoria_cod_categoria;
        var cd_municipio_cod_ibge = req.params.cd_municipio_cod_ibge;
        
        cdDAO.listarPontoTipo(cod_ponto, categoria_cod_categoria, cd_municipio_cod_ibge, function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });
    
    
    
    //Rota usada para apagar um Ponto com base nos IDs.
    app.delete('/read/ponto/:cod_ponto/:categoria_cod_categoria/:cd_municipio_cod_ibge', function(req, res){
        var cod_ponto = req.params.cod_ponto;
        var cod_categoria = req.params.categoria_cod_categoria;
        var cd_municipio_cod_ibge = req.params.cd_municipio_cod_ibge;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.apagarPonto(cod_ponto, cod_categoria, cd_municipio_cod_ibge, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    });
    
};