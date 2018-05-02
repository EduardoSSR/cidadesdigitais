angular.module('cidadesdigitais').controller('editLotesController', function ($scope, $routeParams, $filter, InjecaoInfo, growl, $window) {
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    }

    /* --INICIO-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    var permitido = true;

    function valida() {
        $scope.modulos = '';
        InjecaoInfo.getUsuarioModulos($window.sessionStorage.idUser)
            .success(function (modulo) {
                permitido = InjecaoInfo.permissaoAcesso(14003, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */

    function carregaController() {
        if (permitido) {

            $scope.loteId = $routeParams.loteId;



            /*============== Funcao para carregar o lote ao banco de dados de acordo com seu id =================*/
            function carregarLote() {
                if ($routeParams.loteId) {
                    InjecaoInfo.getLoteById($routeParams.loteId)
                        .success(function (data) {
                            $scope.lote = {
                                cod_lote: data.cod_lote,
                                entidade_cnpj: data.cnpj,
                                contrato: data.contrato,
                                dt_inicio_vig: new Date(data.dt_inicio_vig),
                                dt_final_vig: new Date(data.dt_final_vig),
                                dt_reajuste: new Date(data.dt_reajuste)
                            };
                            getEntidades();
                        })
                        .error(function (error) {
                            var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor tente novamente mais tarde.</p>";
                            mensagem(msg, "error", 10000);
                        });
                };
            };


            /*============== Funcao para carregar os itens do banco de dados =================*/
            function getItens() {
                InjecaoInfo.getLoteItens($routeParams.loteId)
                    .success(function (item) {
                        $scope.itens = item;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };


            /*============== Funcao para carregar do banco de dados as previsoes de empenho referentes ao lote =================*/
            function getPrevEmpenhos() {
                InjecaoInfo.getPrevisaoEmpenho()
                    .success(function (prevEmpenho) {
                        $scope.prevEmpenhos = prevEmpenho;
                    })
                    .error(function (error) {
                        var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar as previsões de empenho do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };


            function getEmpenhos() {
                InjecaoInfo.getEmpenhos()
                    .success(function (empenho) {
                        $scope.empenhos = empenho;
                    })
                    .error(function (error) {
                        var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar os empenhos do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    })
            }


            /*============== Funcao para carregar do banco de dados os reajustes referentes ao lote =================*/
            function getReajustes() {
                InjecaoInfo.getReajuste()
                    .success(function (reajuste) {
                        $scope.reajustes = reajuste;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os reajustes do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };

            function getEntidades() {
                InjecaoInfo.getEntidade()
                    .success(function (entidade) {
                        $scope.entidades = entidade;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar as entidades do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    })
            };


            /*============== Funcao para editar o lote =================*/
            $scope.editLote = function () {

                var lotes = {
                    cod_lote: $routeParams.loteId,
                    entidade_cnpj: $scope.lote.entidade_cnpj,
                    contrato: $scope.lote.contrato,
                    dt_inicio_vig: $filter('date')($scope.lote.dt_inicio_vig, "y-MM-dd"),
                    dt_final_vig: $filter('date')($scope.lote.dt_final_vig, "y-MM-dd"),
                    dt_reajuste: $filter('date')($scope.lote.dt_reajuste, "y-MM-dd")
                };

                console.log(lotes)

                InjecaoInfo.putLote(lotes)
                    .success(function () {
                        var msg = "<strong>Editado</strong><br><p>O lote " + lotes.cod_lote + " foi editado com sucesso.</p>";
                        mensagem(msg, "success", 5000);
                        carregarLote();
                    })
                    .error(function (error) {
                        var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao ediatr o lote " + lotes.cod_lote + ". Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });

            };




            /*============== Funcao para atualizar os itens alterados no banco de dados =================*/
            $scope.armTempItens = function (itens) {
                var itensLote = [];

                for (var r = 0; r < itens.length; r++) {

                    itensLote[r] = {
                        lote_cod_lote: $scope.lote.cod_lote,
                        itens_cod_item: itens[r].itens_cod_item,
                        itens_tipo_item_cod_tipo_item: itens[r].itens_tipo_item_cod_tipo_item,
                        preco: itens[r].preco
                    }
                }

                InjecaoInfo.putLoteItens(itensLote)
                    .success(function () {
                        var msg = "<strong>Atualizado</strong><br><p>Os Itens foram atualizados com sucesso.</p>";
                        mensagem(msg, "success", 5000);
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao atualizar os itens. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };


            /*============== Funcao para adicionar os reajustes =================*/
            $scope.addReajuste = function () {

                var reajusteLote = {
                    ano_ref: $scope.reajuste.ano_ref,
                    lote_cod_lote: $scope.loteId,
                    percentual: $scope.reajuste.percentual
                }

                InjecaoInfo.postReajuste(reajusteLote)
                    .success(function () {
                        var msg = "<strong>Cadastrado</strong><br><p>O rejuste foi cadastrado com sucesso.</p>";
                        mensagem(msg, "success", 5000);
                        delete $scope.reajuste;
                        $scope.formReajuste.$setPristine();
                        getReajustes();
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao cadastrar o reajuste. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            }


            /*============== Funcao para excluir os reajustes de acordo com id do lote e o ano de referencia passados =================*/
            $scope.removReajuste = function (reajuste) {
                bootbox.confirm({
                    message: 'Tem certeza que deseja excluir o reajuste de <strong>' + reajuste.ano_ref + '</strong> ?',
                    callback: function (confirmacao) {
                        if (confirmacao) {
                            InjecaoInfo.deleteReajuste($scope.loteId, reajuste.ano_ref)
                                .success(function () {
                                    var msg = '<strong>Excluído</strong><br><p>O rejuste de <strong>' + reajuste.ano_ref + '</strong> foi excluído com sucesso.</p>';
                                    mensagem(msg, "success", 5000);
                                    getReajustes();
                                })
                                .error(function (error) {
                                    var msg = '<strong>Erro!</strong><br><p>Ocorreu um erro ao excluir este reajuste. Por favor, tente novamente mais tarde.</p>';
                                    mensagem(msg, "error", 10000);
                                });
                        };
                    },
                    buttons: {
                        cancel: {
                            label: 'Cancelar',
                            className: 'btn-default'
                        },
                        confirm: {
                            label: 'Excluir',
                            className: 'btn-danger'
                        }

                    }
                });
            };

            carregarLote();
            getReajustes();
            getEmpenhos();
            getPrevEmpenhos();
            getItens();
        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();
});
