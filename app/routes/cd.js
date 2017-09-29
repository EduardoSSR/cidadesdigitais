module.exports = function(app){
    
    
    var estado = [
            { uf: 'AC', nome: 'Acre'},
            { uf: 'AL', nome: 'Alagoas'},
            { uf: 'AM', nome: 'Amazonas'},
            { uf: 'AP', nome: 'Amapá'},
            { uf: 'BA', nome: 'Bahia'},
            { uf: 'CE', nome: 'Ceará'},
            { uf: 'DF', nome: 'Distrito Federal'},
            { uf: 'ES', nome: 'Espírito Santo'},
            { uf: 'GO', nome: 'Goiás'},
            { uf: 'MA', nome: 'Maranhão'},
            { uf: 'MT', nome: 'Mato Grosso'},
            { uf: 'MS', nome: 'Mato Grosso do Sul'},
            { uf: 'MG', nome: 'Minas Gerais'},
            { uf: 'PA', nome: 'Pará'},
            { uf: 'PB', nome: 'Paraíba'},
            { uf: 'PR', nome: 'Paraná'},
            { uf: 'PE', nome: 'Pernambuco'},
            { uf: 'PI', nome: 'Piauí'},
            { uf: 'RJ', nome: 'Rio de Janeiro'},
            { uf: 'RN', nome: 'Rio Grande do Norte'},
            { uf: 'RS', nome: 'Rio Grande do Sul'},
            { uf: 'RO', nome: 'Rondônia'},
            { uf: 'RR', nome: 'Roraima'},
            { uf: 'SC', nome: 'Santa Catarina'},
            { uf: 'SP', nome: 'São Paulo'},
            { uf: 'SE', nome: 'Sergipe'},
            { uf: 'TO', nome: 'Tocantins'}];
    

	//Rota para listar todas as Cidades Digitais.
	app.get('/read/cd', function (req, res){
    	var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarAll(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });



    //Retorna todos os Estados com suar respectivas UFs.
    app.get('/read/cd/estado', function(req, res){
        res.status(200).json(estado);
    });


    //Rota lista todos os municipios e seus respectivos codigos ibge de acordo com a uf recebida.
    app.get('/read/cd/municipio/:uf', function(req, res){
        var uf = req.params.uf;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarM(uf,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    });


    //Rota para listar a Cidade Digital e o nome do municipio respectivo.
    app.get('/read/cd/:id', function(req, res){
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.listarAll(function (erro, resultado){
            var cd = resultado.find(function(cd){
                return cd.municipio_cod_ibge == req.params.id;
            });
            
            for(var x = 0; x < estado.length; x++){
                if(estado[x].uf == cd.uf){
                    var result = {
                        municipio_cod_ibge : cd.municipio_cod_ibge,
                        lote_cod_lote : cd.lote_cod_lote,
                        os_pe : cd.os_pe,
                        os_imp : cd.os_imp,
                        nome_municipio : cd.nome_municipio,
                        uf : cd.uf,
                        nome_estado : estado[x].nome
                    }
                }
            }
            
            res.status(200).json(result);
        });

        connection.end();
    });
    
    
    //Rota lista todos os itens das didades digitais.
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


    //Rota para gravar um novo Cd no Banco de Dados.
    app.post('/read/cd', function(req, res){
        var cd = req.body;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.salvar(cd, function(erro, resultado){
            var msgErro = {msg: 'Ocorreu um erro com o Banco de Dados.'};
            if(erro){
                console.log(erro);
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
        
        cdDAO.editar(cd, cod_ibge, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
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
            
            var cd_municipio_cod_ibge = cdItens[i].cd_municipio_cod_ibge;
            
            /*cdDAO.editarItens(cdItem, cd_municipio_cod_ibge, function (erro, resultado){
                if (erro){
                    console.log(erro);
                    res.sendStatus(500);
                }else{
                    console.log(resultado);
                    res.sendStatus(204);
                }
            });*/
        }

        connection.end();
    });
    
    

    //Rota usada para apagar um cd com base no ID.
    app.delete('/read/cd/:id', function(req, res){
        var id = req.params.id;
        
        var connection = app.infra.connectionFactory();
        var cdDAO = new app.infra.CdDAO(connection);

        cdDAO.apagar(id,  function(erro, resultado){
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