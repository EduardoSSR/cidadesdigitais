angular.module('cidadesdigitais').controller('editCdController', function ($scope, $http, $stateParams, $rootScope, $filter, InjecaoInfo, growl, $window) {

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    }
    $scope.ponto = "0";
    $scope.glosas = '';

    /* --INICIO-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    var permitido = true;

    function valida() {
        $scope.modulos = '';
        InjecaoInfo.getUsuarioModulos($window.sessionStorage.idUser)
            .success(function (modulo) {
                permitido = InjecaoInfo.permissaoAcesso(13003, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */

    function carregaController() {
        if (permitido) {

            $scope.codIbge = $stateParams.cdCodIbge;

            
            
            /*============== Funcao para carregar tudo que eh necessario em cidades digitais =================*/
            function carregarCd() {
                $http.get('/read/cd/' + $scope.codIbge)
                    .success(function (cd) {
                        $scope.cidadeDigital = cd;
                    
                        getPrevisaoEmpenho(cd.lote_cod_lote);
                        getEmpenho(cd.lote_cod_lote);
                        getFatura();
                        getPagamento();
                        getEstados();
                        getMunicipios(cd.uf);
                        getLotes();
                        carregaItens();

                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os dados do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };

            /*============== Funcao que tras todas previsões de empenho do servidor =================*/
            function getPrevisaoEmpenho(codLote) {
                InjecaoInfo.getPrevisaoEmpenhoByCodLote(codLote)
                    .success(function (previsaoEmpenho) {
                        $scope.previsaoEmpenhos = previsaoEmpenho;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar as previsões de empenho  do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            }

            /*============== Funcao que tras todos os empenho do servidor =================*/
            function getEmpenho(codLote) {
                InjecaoInfo.getEmpenhosByCodLote(codLote)
                    .success(function (empenho) {
                        $scope.empenhos = empenho;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os empenho do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            }


            /*============== Funcao que trazer processar a GLOSA =================*/
            function getGlosa() {
                InjecaoInfo.getGlosa($scope.codIbge)
                    .success(function (glosa) {
                        $scope.glosas = glosa;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao processar a Glosa. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            }

            /*============== Funcao que tras todos as faturas do servidor =================*/
            function getFatura() {
                InjecaoInfo.getCdFaturaByCodIbge($scope.codIbge)
                    .success(function (fatura) {
                        $scope.faturas = fatura;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar as fatura do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            }


            /*============== Funcao que tras todos os pagamentos do servidor =================*/
            function getPagamento() {
                InjecaoInfo.getPagamentoIbge($scope.codIbge)
                    .success(function (pagamento) {
                        $scope.pagamentos = pagamento;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar as fatura do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            }


            /*============== Funcao que tras todos es estados do servidor =================*/
            function getEstados() {
                InjecaoInfo.getEstado()
                    .success(function (estado) {
                        $scope.estados = estado;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os estados do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            }

            /*============== Funcao que tras todos os municipios do banco de acordo com a uf da cidade digital =================*/
            function getMunicipios(uf) {
                InjecaoInfo.getMunicipio()
                    .success(function (municipio) {
                        $scope.municipios = municipio;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os municípios do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };



            /*============== Funcao que tras todos os lotes do banco =================*/
            function getLotes() {
                InjecaoInfo.getLotes()
                    .success(function (loteCd) {
                        $scope.lotes = loteCd;

                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };



            /*============== Funcao que envia para a funcao getMunicipios() o estado que a cidade digital pertence =================*/
            $scope.enviarEstado = function (cd) {
                getMunicipios(cd.uf);
            }



            /*============== Funcao que carrega todos os itens do banco =================*/
            function carregaItens() {
                InjecaoInfo.getCdItens($scope.codIbge)
                    .success(function (item) {
                        $scope.itens = item;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os itens do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };




            /*============== Funcao que editar a cidade digital de acordo com o cod ibge =================*/
            $scope.editarCd = function () {

                var cdEditada = {
                    municipio_cod_ibge: $scope.cidadeDigital.municipio_cod_ibge,
                    lote_cod_lote: $scope.cidadeDigital.lote_cod_lote,
                    os_pe: $scope.cidadeDigital.os_pe,
                    os_imp: $scope.cidadeDigital.os_imp
                }
                $http.put('/read/cd', cdEditada)
                    .success(function () {
                        carregarCd();
                        var msg = "<strong>Editado</strong><br><p>" + $scope.cidadeDigital.nome_municipio + " foi editado(a) com successo.</p>";
                        mensagem(msg, "success", 5000);
                    })
                    .error(function (error) {
                        carregarCd();
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao editar " + $scope.cidadeDigital.nome_municipio + ". Tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };



            /*============== Funcao que atualiza os itens editados da cidade digital =================*/
            $scope.enviarItensCd = function (itens) {
                console.log(itens)
                var itensCd = [];

                for (var x = 0; x < itens.length; x++) {
                    itensCd[x] = {
                        cd_municipio_cod_ibge: $stateParams.cdCodIbge,
                        itens_cod_item: itens[x].itens_cod_item,
                        itens_tipo_item_cod_tipo_item: itens[x].itens_tipo_item_cod_tipo_item,
                        quantidade_previsto: itens[x].quantidade_previsto,
                        quantidade_projeto_executivo: itens[x].quantidade_projeto_executivo,
                        quantidade_termo_instalacao: itens[x].quantidade_termo_instalacao
                    }
                }
                console.log(itensCd)
                $http.put('read/cdItens', itensCd)
                    .success(function () {
                        var msg = "<strong>Cadastrado</strong><br><p>Todos os itens foram atualizados com successo.</p>";
                        mensagem(msg, "success", 5000);
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao atualizar os itens. Tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };

            carregarCd();

        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();

});