angular.module('cidadesdigitais').controller('editCdController', function ($scope, $http, $routeParams, $rootScope, growl, InjecaoInfo, $filter) {

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    $scope.mensagem = function (msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    }

    $scope.codIbge = $routeParams.cdCodIbge;


    /*============== Funcao para carregar tudo que eh necessario em cidades digitais =================*/
    $scope.carregarCd = function () {
        $http.get('/read/cd/' + $routeParams.cdCodIbge)
            .success(function (cd) {
                $scope.cidadeDigital = cd;

                $scope.getMunicipios($scope.cidadeDigital.uf);
                $scope.getEstados();
                $scope.getLotes();
                $scope.carregaTabela();
                $scope.carregaItens();
                $scope.getProcessos();
                $scope.getPrevisaoEmpenho();
                $scope.getEmpenho();
                $scope.carregarPonto();
            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os dados do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };

    /*============== Funcao que tras todas previsões de empenho do servidor =================*/
    $scope.getPrevisaoEmpenho = function () {
        InjecaoInfo.getPrevisaoEmpenho()
            .success(function (previsaoEmpenho) {
                $scope.previsaoEmpenhos = previsaoEmpenho;
            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar as previsões de empenho  do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });


    }

    /*============== Funcao que tras todos os empenho do servidor =================*/
    $scope.getEmpenho = function () {
        InjecaoInfo.getEmpenho()
            .success(function (empenho) {
                $scope.empenhos = empenho;
            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os empenho do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    }




    /*============== Funcao que tras todos es estados do servidor =================*/
    $scope.getEstados = function () {
        InjecaoInfo.getEstado()
            .success(function (estado) {
                $scope.estados = estado;
            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os estados do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    }

    /*============== Funcao que tras todos os municipios do banco de acordo com a uf da cidade digital =================*/
    $scope.getMunicipios = function (uf) {
        InjecaoInfo.getMunicipio()
            .success(function (municipio) {
                $scope.municipios = municipio;
            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os municípios do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };



    /*============== Funcao que tras todos os lotes do banco =================*/
    $scope.getLotes = function () {
        InjecaoInfo.getLote()
            .success(function (loteCd) {
                $scope.lotes = loteCd;

            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };



    /*============== Funcao que envia para a funcao getMunicipios() o estado que a cidade digital pertence =================*/
    $scope.enviarEstado = function (cd) {
        $scope.getMunicipios(cd.uf);
    }


    /* ============== Funcao que carrega todos os contatos do banco =================*/
    $scope.carregaTabela = function () {
        InjecaoInfo.getContato()
            .success(function (contato) {
                $scope.contatos = contato;
            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os contatos do banco de dados. Por favor tente novamente mais tarde.</p>";
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

    /*============== Funcao que carrega todos os pontos do banco =================*/
    $scope.carregarPonto = function () {
        InjecaoInfo.getVisuPonto()
            .success(function (pontoTip) {
                $scope.pontos = InjecaoInfo.formatJsonPonto(pontoTip);
            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os pontos do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });

    };


    /*============== Funcao que tras todos os processos do banco =================*/
    $scope.getProcessos = function () {
        InjecaoInfo.getProcessos()
            .success(function (processo) {
                $scope.processos = processo;
            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os processos do banco de dados. Por favor tente novamente mais tarde.</p>";
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
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao editar " + $scope.cidadeDigital.nome_municipio + ". Tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };



    /*============== Funcao que atualiza os itens editados da cidade digital =================*/
    $scope.enviarItensCd = function (itens) {
        $scope.itensCd = [];

        for (var x = 0; x < itens.length; x++) {
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
            .success(function () {
                $scope.msg = "<strong>Cadastrado</strong><br><p>Todos os itens foram atualizados com successo.</p>";
                $scope.mensagem($scope.msg, "success", 5000);
            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao atualizar os itens. Tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };



    $scope.carregarCd();



});