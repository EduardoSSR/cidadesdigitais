module.exports = function(app){
    var api = {};
    
    //Json de Estados com uf e nome do estado.
    var estado = [{ uf: 'AC', nome: 'Acre'}, { uf: 'AL', nome: 'Alagoas'}, { uf: 'AM', nome: 'Amazonas'}, { uf: 'AP', nome: 'Amapá'}, { uf: 'BA', nome: 'Bahia'}, { uf: 'CE', nome: 'Ceará'}, { uf: 'DF', nome: 'Distrito Federal'}, { uf: 'ES', nome: 'Espírito Santo'}, { uf: 'GO', nome: 'Goiás'}, { uf: 'MA', nome: 'Maranhão'}, { uf: 'MT', nome: 'Mato Grosso'}, { uf: 'MS', nome: 'Mato Grosso do Sul'}, { uf: 'MG', nome: 'Minas Gerais'}, { uf: 'PA', nome: 'Pará'}, { uf: 'PB', nome: 'Paraíba'}, { uf: 'PR', nome: 'Paraná'}, { uf: 'PE', nome: 'Pernambuco'}, { uf: 'PI', nome: 'Piauí'}, { uf: 'RJ', nome: 'Rio de Janeiro'}, { uf: 'RN', nome: 'Rio Grande do Norte'}, { uf: 'RS', nome: 'Rio Grande do Sul'}, { uf: 'RO', nome: 'Rondônia'}, { uf: 'RR', nome: 'Roraima'}, { uf: 'SC', nome: 'Santa Catarina'}, { uf: 'SP', nome: 'São Paulo'}, { uf: 'SE', nome: 'Sergipe'}, { uf: 'TO', nome: 'Tocantins'}];
    
//---------------Callbacks de Estado---------------//
    
    //Lista todos os Estados.
    api.listaEstados = function(req, res){
        res.status(200).json(estado);
    };
    
//---------------Callbacks de Municipios da Cidade Digital---------------//
    
    //Lista os Municipios da Cidade Digital.
    api.listaCdMunicipios = function(req, res){
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
    };
    
//---------------Callbacks de Cidade Digital---------------//
    
    //Lista todas as Cidades Digitais.
    api.listaCd = function (req, res){
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
    };
    
    
    //Salva uma nova Cidade Digital no Banco de Dados.
    api.salvaCd = function(req, res){
        var cd = req.body;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.salvarCidadesDigitais(cd, function(erro, resultado){
            if(erro){
                console.log(erro);
                var msgErro = {msg: 'Ocorreu um erro com o Banco de Dados.'};
                res.status(500).json(msgErro);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Lista uma única Cidade Digital com base no ID.
    api.listaCdPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarCidadesDigitais(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
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
                        };
                        break;
                    }
                }

                res.status(200).json(result);
            }
        });

        connection.end();
    };
    
    
    //Edita uma Cidade Digital com base no ID.
    api.editaCd = function(req, res){
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
    };
    
    
    //Apaga uma Cidade Digital com base no ID.
    api.apagaCd = function(req, res){
        var id = req.params.id;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.apagarCidadesDigitais(id, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
//---------------Callbacks de Itens da Cidade Digital---------------//
    
    //Lista os Itens de uma Cidade Digital.
    api.listaCdItens = function(req, res){
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
    };
    
    
    //Edita um Item de uma Cidade Digital.
    api.editaCdItens = function(req, res){
        var cdItens = req.body;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        var error = false;
        var j = 0;
        
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
    
//---------------Callbacks de Processo da Cidade Digital---------------//
    
    //Lista todos os Processos da Cidade Digital.
    api.listaCdProcessso = function (req, res){
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
    };
    
    
    //Salva um novo Processo da Cidade Digital no Banco de Dados.
    api.salvaCdProcesso = function(req, res){
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
    };
    
    
    //Lista um único Processo da Cidade Digital com base no ID.
    api.listaCdProcesssoPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarProcesso(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var processo = resultado.find(function(processo){
                    return processo.cod_processo == req.params.cod_processo && processo.cd_municipio_cod_ibge == req.params.cd_municipio_cod_ibge;
                });
                res.status(200).json(processo);
            }
        });

        connection.end();
    };
    
    
    //Edita um Processo da Cidade Digital com base no ID.
    api.editaCdProcesso = function(req, res){
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
    };
    
    
    //Apaga um Processo da Cidade Digital com base no ID.
    api.apagaCdProcesso = function(req, res){
        var cod_processo = req.params.cod_processo;
        var cd_municipio_cod_ibge = req.params.cd_municipio_cod_ibge;
        
        console.log(cod_processo, cd_municipio_cod_ibge)
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
    };
    
//---------------Callbacks de Acompanhamento da Cidade Digital---------------//
    
    //Lista todos os Acompanhamentos da Cidade Digital.
    api.listaCdAcompanhamento = function (req, res){
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
    };
    
    
    //Salva um novo Acompanhamento da Cidade Digital no Banco de Dados.
    api.salvaCdAcompanhamento = function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        var error = false;
        var j = 0;
        
        var uacom = {
            cd_municipio_cod_ibge : req.body.cd_municipio_cod_ibge,
            data : req.body.data,
            relato : req.body.relato,
            titulo : req.body.titulo
        };

        cdDAO.salvarAcompanhamento(uacom, function(erro, resultado){
            if(erro){
                console.log(erro);
                error = true;
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
    
    
    //Salva um novo Assunto em um Acompanhamento da Cidade Digital.
    api.salvaCdUacomAssunto = function(req, res){
        var uacom_assunto = req.body;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        var error = false;
        var j = 0;
        
        for(var i=0; i<uacom_assunto.length; i++){
            cdDAO.salvarUacomAssun(uacom_assunto[i], function(erro, resultado){
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
    
    
    //Lista um único Acompanhamento da Cidade Digital com base no ID.
    api.listaCdAcompanhamentoPorId = function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        var cd_municipio_cod_ibge = req.params.cd_municipio_cod_ibge;
        var data = req.params.data;
        
        cdDAO.listarUacomAssun(cd_municipio_cod_ibge, data, function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
//---------------Callbacks de Ponto da Cidade Digital---------------//
    
    //Lista todos os Pontos da Cidade Digital.
    api.listaCdPonto = function (req, res){
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
    };
    
    
    //Salva um novo Ponto da Cidade Digital no Banco de Dados.
    api.salvaCdPonto = function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        var error = false;
        var j = 0;
        
        var ponto = {
            cod_ponto : req.body.cod_ponto,
            categoria_cod_categoria : req.body.categoria_cod_categoria,
            cd_municipio_cod_ibge : req.body.cd_municipio_cod_ibge,
            nome : req.body.nome,
            endereco : req.body.endereco,
            numero : req.body.numero,
            complemento : req.body.complemento,
            bairro : req.body.bairro,
            cep : req.body.cep,
            latitude : req.body.latitude,
            longitude : req.body.longitude
        };

        cdDAO.salvarPonto(ponto, function(erro, resultado){
            if(erro){
                console.log(erro);
                error = true;
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
    
    
    //Lista um único Ponto da Cidade Digital com base no ID.
    api.listaCdPontoPorId = function(req, res){
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
    };
    
    
    //Edita um Ponto da Cidade Digital com base no ID.
    api.editaCdPonto = function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        var error = false;
        var j = 0;
        
        var ponto = {
            cod_ponto : req.body.cod_ponto,
            categoria_cod_categoria : req.body.categoria_cod_categoria,
            cd_municipio_cod_ibge : req.body.cd_municipio_cod_ibge,
            nome : req.body.nome,
            endereco : req.body.endereco,
            numero : req.body.numero,
            complemento : req.body.complemento,
            bairro : req.body.bairro,
            cep : req.body.cep,
            latitude : req.body.latitude,
            longitude : req.body.longitude
        };
        
        var cod_ponto = req.body.cod_ponto;
        var cod_categoria = req.body.categoria_cod_categoria;
        var cod_ibge = req.body.cd_municipio_cod_ibge;
        
        cdDAO.editarPonto(ponto, cod_ponto, cod_categoria, cod_ibge, function(erro, resultado){
            if(erro){
                console.log(erro);
                error = true;
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
    
    
    //Apaga um Ponto da Cidade Digital com base no ID.
    api.apagaCdPonto = function(req, res){
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
    };
    
    
    //Apaga uma Tipologia de um Ponto com base no ID.
    api.apagaCdPontoTipo = function(req, res){
        var cod_ponto = req.params.cod_ponto;
        var cod_categoria = req.params.categoria_cod_categoria;
        var cd_municipio_cod_ibge = req.params.cd_municipio_cod_ibge;
        var cod_tipologia = req.params.tipologia_cod_tipologia;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.apagarPontoTipo(cod_ponto, cod_categoria, cd_municipio_cod_ibge, cod_tipologia, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
//---------------Callbacks de Pagamento da Cidade Digital---------------//
    
    //Lista todos os Pagamento da Cidade Digital.
    api.listaCdPagamento = function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);
        
        var cod_ibge = req.params.cod_ibge;
        
        cdDAO.listarOtb(cod_ibge, function (erro, resultado){
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