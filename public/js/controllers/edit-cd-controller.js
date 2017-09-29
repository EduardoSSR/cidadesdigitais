angular.module('cidadesdigitais').controller('editCdController', function ($scope, $http, $routeParams, $rootScope, growl) {

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    $scope.mensagem = function(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    
    
    /*============== Funcao para carregar tudo que eh necessario em cidades digitais =================*/
    $scope.carregarCd = function () {

        $http.get('/read/cd/' + $routeParams.cdCodIbge)
            .success(function (cd) {
                $scope.cidadeDigital = cd;
                $scope.getMunicipios($scope.cidadeDigital.uf);
                $scope.getEstados();
                $scope.getLotes();
                $scope.carregaTabela();
                $scope.getTelefone();
                $scope.carregaItens();
                $scope.getProcessos();

            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os dados do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };
    
    
    /*============== Funcao que tras todos es estados do servidor =================*/
    $scope.getEstados = function () {
        $http.get('/read/cd/estado')
            .success(function (estado) {
                $scope.estados = estado;
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os estados do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    }
    
    
    /*============== Funcao que tras todos os municipios do banco de acordo com a uf da cidade digital =================*/
    $scope.getMunicipios = function (uf) {
        $http.get('/read/cd/municipio/' + uf)
            .success(function (municipio) {
                $scope.municipios = municipio;
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os municípios do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };

    
     /*============== Funcao que tras todos os telefones do banco =================*/
     $scope.getTelefone = function () {
        $http.get('/read/telefone')
            .success(function (telefone) {
                $scope.telefones = telefone;
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os telefones do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    }
    

     /*============== Funcao que tras todos os lotes do banco =================*/
    $scope.getLotes = function () {
        $http.get('/read/lotes/')
            .success(function (loteCd) {
                $scope.lotes = loteCd;

            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };
    
     /*============== Funcao que tras todos os processos do banco =================*/
    $scope.getProcessos = function (processo){
        $http.get('/read/processo')
            .success(function(processo){
                $scope.processo = processo;
        })
        .error(function(error){
            
        });
    }
    
    
    /*============== Funcao que envia para a funcao getMunicipios() o estado que a cidade digital pertence =================*/
    $scope.enviarEstado = function (cd) {
        $scope.getMunicipios(cd.uf);
    }
    

    /*============== Funcao que carrega todos os contatos do banco =================*/
    $scope.carregaTabela = function () {
        $http.get('read/contato/')
            .success(function (contato) {
                $scope.contatos = contato;
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os contatos do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };
    
    /*============== Funcao que carrega todos os itens do banco =================*/
    $scope.carregaItens = function () {
        $http.get('read/cdItens/' + $routeParams.cdCodIbge)
            .success(function (item) {
                $scope.itens = item;
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os itens do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };

    
    /*============== Funcao que editar a cidade digital de acordo com o cod ibge =================*/
    $scope.editarCd = function () {
                
        $scope.cdEditada = {
            municipio_cod_ibge: $scope.cidadeDigital.municipio_cod_ibge,
            lote_cod_lote: $scope.cidadeDigital.lote_cod_lote,
            os_pe: $scope.cidadeDigital.os_pe,
            os_imp: $scope.cidadeDigital.os_imp
        }
        $http.put('/read/cd', $scope.cdEditada)
            .success(function () {
                $scope.carregarCd();
                $scope.msg = "<strong>Editado</strong><br><p>" + $scope.cidadeDigital.nome_municipio + " foi editado(a) com successo.</p>";
                $scope.mensagem($scope.msg, "success", 5000);
            })
            .error(function (error) {
                $scope.carregarCd();
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao editar " + $scope.cidadeDigital.nome_municipio + ". Tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };


    /*============== Cadastra contatos em Cidades Digistais =================*/
    $scope.contatos = {};
    $scope.submeterContatosCd = function () {
        
        $scope.contatos = {
            cd_municipio_cod_ibge: $routeParams.cdCodIbge,
            nome: $scope.contato.nome,
            email: $scope.contato.email,
            funcao: $scope.contato.funcao
        };

        $http.post('read/contato', $scope.contatos)
            .success(function () {
                delete $scope.contato;
                $scope.carregaTabela();
                $scope.msg = "<strong>Cadastrado</strong><br><p>O contato " + $scope.contatos.nome + " foi cadastrado(a) com successo.</p>";
                $scope.mensagem($scope.msg, "success", 5000);
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao cadastrar " + $scope.contatos.nome  + ". Tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });

    };
    
    
    /*============== Remove contatos em Cidades Digistais =================*/
    $scope.removerC = function (contato) {

        $http.delete('read/contato/' + contato.cod_contato)
            .success(function (contato) {

                console.log(contato.cod_contato);
                var indiceContato = $scope.contatos.indexOf(contato);
                $scope.contatos.splice(indiceContato, 1);
                
                $scope.msg = "<strong>Excluido</strong><br><p>O contato foi excluido com successo.</p>";
                $scope.mensagem($scope.msg, "success" ,5000 );
                $scope.carregaTabela();

            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao excluir " + contato.nome  + ". Tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };

    
    /*============== Adicionar telefone de contatos em Cidades Digistais =================*/
    $scope.addT = function (telefone, contato) {

        /*$http.get('read/contato/' + contatoCod).success(function(contato){$scope.contatos=contato}).erro(function(error){});
        if($scope.contatos.quantContatos <= 10){           
        Fazer essa verificação. Ps:ver com o back dps pra poder trazer a quant de contatos em read/contato/id   
        O THIAGO FALOU PRA DEIXAR ILIMITADO  18/09/2017*/
        
        $scope.telefones = {
            contato_cod_contato: contato.cod_contato,
            telefone: telefone.telefone,
            tipo: telefone.tipo
        }

        $http.post('read/telefone', $scope.telefones)
            .success(function () {
                $scope.msg = "<strong>Adicionado</strong><br><p>Foi adicionado com sucesso o telefone " + $scope.telefones.telefone + " no contato de " + contato.nome + "</p>";
                $scope.mensagem($scope.msg, "success", 5000);
                $scope.getTelefone();
            })
            .error(function (error) {
               $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao adicionar o telefone. Tente novamente mais tarde.</p>";
               $scope.mensagem($scope.msg, "error", 10000);
            });
        
        /*}else{
            $scope.msg = "<strong>Aviso</strong><br><p>Não podem ser cadastrados mais de 10 telefones por contato.</p>";
            $scope.mensagem($scope.msg, "warning", 5000);
          }
        */

    }
    
    
    /*============== Funcao que remove o telefone de acordo com o id do mesmo =================*/
    $scope.removerT = function(telefone){
      $http.delete('read/telefone/' + telefone.cod_telefone)
            .success(function (telefone) {
                var indiceTelefone = $scope.telefones.indexOf(telefone);
                $scope.telefones.splice(indiceTelefone, 1);
                $scope.getTelefone();
                $scope.msg = "<strong>Excluido</strong><br><p>O telefone foi excluido com successo.</p>";
                $scope.mensagem($scope.msg, "success" ,5000 );

            })
            .error(function (error) {
               $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao excluir " + telefone.telefone  + ". Tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
        
    };
    
    
    /*============== Funcao que atualiza os itens editados da cidade digital =================*/
    $scope.enviarItensCd = function(itens){
        $scope.itensCd = [];
        
        for(var x = 0; x < itens.length; x++){
            $scope.itensCd[x] = {
                cd_municipio_cod_ibge: itens[x].cd_municipio_cod_ibge,
                itens_cod_item: itens[x].itens_cod_item,
                itens_tipo_item_cod_tipo_item: itens[x].itens_tipo_item_cod_tipo_item,
                quantidade_previsto: itens[x].qntPrev,
                quantidade_projeto_executivo: itens[x].qntExec,
                quantidade_termo_instalacao: itens[x].qntTerm
            }
        }
        
        $http.put('read/cdItens', $scope.itensCd)
        .success(function(){
            $scope.msg = "<strong>Cadastrado</strong><br><p>Todos os itens foram atualizados com successo.</p>";
            $scope.mensagem($scope.msg, "success" ,5000 );
        })
        .error(function(error){
            $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao atualizar os itens. Tente novamente mais tarde.</p>";
            $scope.mensagem($scope.msg, "error", 10000);
        });
    };

    
    /*============== Chama o método carregarCd() para carregar os dados da pagina de cidades digitais =================*/
    $scope.carregarCd();
});