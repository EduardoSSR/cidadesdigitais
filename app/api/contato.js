module.exports = function(app){
    var api = {};
    
//---------------Callbacks de Contatos---------------//
    
    //Lista todos os Contatos da Cidade Digital com base no Id.
    api.listaContatoCd = function(req, res){
        var cod_ibge= req.params.cod_ibge;
        var contatos = new Array();
        var telefones = new Array();
        
		var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);
        
        contatoDAO.listarContatoCd(cod_ibge, function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                
                for(var i=0; i<resultado.length; i++){
                    
                    if(resultado[i].cod_telefones){
                        var cod_telefones = resultado[i].cod_telefones.split(",");
                        var num_telefones = resultado[i].num_telefones.split(",");
                        var tipo_telefones = resultado[i].tipo_telefones.split(",");
                        var contato_cod_contato = resultado[i].contato_cod_contatos.split(",");
                                                
                        for(var j=0; j<cod_telefones.length; j++){
                            telefones[j] = {
                                cod_telefone: cod_telefones[j],
                                num_telefone: num_telefones[j],
                                tipo_telefone: tipo_telefones[j],
                                contato_cod_contato: contato_cod_contato[j]
                            }
                        }
                        
                        contatos[contatos.length] = {
                            cod_contato: resultado[i].cod_contato,
                            entidade_cnpj: resultado[i].entidade_cnpj,
                            cd_municipio_cod_ibge: resultado[i].cd_municipio_cod_ibge,
                            nome: resultado[i].nome,
                            email: resultado[i].email,
                            funcao: resultado[i].funcao,
                            telefones: telefones
                        }
                        

                    }else{
                        contatos[contatos.length] = {
                            cod_contato: resultado[i].cod_contato,
                            entidade_cnpj: resultado[i].entidade_cnpj,
                            cd_municipio_cod_ibge: resultado[i].cd_municipio_cod_ibge,
                            nome: resultado[i].nome,
                            email: resultado[i].email,
                            funcao: resultado[i].funcao,
                            telefones: []
                        }
                    }
                }
                
                res.status(200).json(contatos);
            }
        });

        connection.end();
	};
    
    
    //Lista todos os Contatos.
    api.listaContatoCnpj = function(req, res){
        var cnpj = req.params.cnpj;
        
		var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);
        
        contatoDAO.listarContatoCnpj(cnpj, function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();

	};
    
    
    //Salva um novo Contato no Banco de Dados.
    api.salvaContato = function(req, res){
        var contato = req.body;
        
        var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);

        contatoDAO.salvarContato(contato, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Edita um Contatos com base no ID.
    api.editaContato = function(req, res){
        var contato = req.body;
        var cod_contato = req.body.cod_contato;

        var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);
        
        contatoDAO.editarContato(contato, cod_contato, function (erro, resultado){
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Apaga um Contatos com base no ID.
    api.apagaContato = function(req, res){
        var id = req.params.id;

        var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);

        contatoDAO.apagarContato(id,  function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    }
    
    
//---------------Callbacks de Telefones---------------//
    
    //Lista todos os Telefones.
    api.listaTelefone = function (req, res){
    	var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);

        contatoDAO.listarTelefone(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Salva um novo Telefone no Banco de Dados.
    api.salvarTelefone = function(req, res){
        var telefone = req.body;
        
        var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);

        contatoDAO.salvarTelefone(telefone, function(erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.sendStatus(204);
            }
        });

        connection.end();
    };
    
    
    //Apaga um Telefone com base no ID.
    api.apagaTelefone = function(req, res){
        var id = req.params.id;
        
        var connection = app.infra.connectionFactory();
        var contatoDAO = new app.infra.ContatoDAO(connection);

        contatoDAO.apagarTelefone(id,  function(erro, resultado){
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