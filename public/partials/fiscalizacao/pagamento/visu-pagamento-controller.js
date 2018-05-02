angular.module('cidadesdigitais').controller('visuPagamentoController', function ($scope, $http, $stateParams, $resource, InjecaoInfo, growl, $window) {
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
        InjecaoInfo.getUsuarioModulos($window.sessionStorage.idUser).success(function (modulo) {
            permitido = InjecaoInfo.permissaoAcesso(16002, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    function carregaController() {
        if (permitido) {
            $scope.pagamentos = [];
            $scope.busca = '';
            $scope.mensagem = '';
            if ($stateParams.pagamentoId) {
                $http.get({
                    pagamentoId: $stateParams.pagamentoId
                }, function (pagamento) {
                    $scope.pagamento = pagamento;
                }, function (erro) {
                    $scope.mensagem = "Não é possivel retorna o pagamento";
                });
            }
            $http.get('read/otb').success(function (pagamento) {
                $scope.pagamentos = pagamento
            }).error(function (error) {
                console.log(error);
            });
            $scope.remover = function (pagamento) {
                bootbox.confirm({
                    message: 'Tem certeza deletar empenho ' + pagamento.cod_otb + ' ?'
                    , callback: function (confirmacao) {
                        if (confirmacao) {
                            $http.delete('read/otb/' + pagamento.cod_otb).success(function () {
                                var indicePagamento = $scope.pagamentos.indexOf(pagamento);
                                $scope.pagamentos.splice(indicePagamento, 1);
                                var msg = "<strong>Apagada</strong><br><p>A previsão de emprenho foi apagada com sucesso.</p>";
                                mensagem(msg, "success", 5000);
                              
                            }).error(function (erro) {
                               
                                var msg = "<strong>Erro!</strong><br><p>Não foi possível excluir a previsão de empenho <strong>"+ pagamento.cod_otb +"</strong>.<br>Verifique se não há empenhos vinculados a mesma ou tente novamente mais tarde.</p>";
                                mensagem(msg, "error", 10000);
                            });
                        };
                    }
                    , buttons: {
                        cancel: {
                            label: 'Cancelar'
                            , className: 'btn-default'
                        }
                        , confirm: {
                            label: 'Excluir'
                            , className: 'btn-danger'
                        }
                    }
                });
            };
        }
        else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();
});