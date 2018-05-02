angular.module('cidadesdigitais').controller('visuPrevEmpController', function ($scope, $http, $routeParams, InjecaoInfo, growl, $window) {

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
                permitido = InjecaoInfo.permissaoAcesso(18002, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */

    function carregaController() {
        if (permitido) {

            $scope.getPrevisaoEmpenho = function () {
                InjecaoInfo.getPrevisaoEmpenho()
                    .success(function (prevEmpenho) {
                        $scope.prevEmpenhos = prevEmpenho;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar as previsões de empenho do banco de dados. Por favor, tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            }

            $scope.deletePrevEmpenho = function (prevEmpenho) {
                bootbox.confirm({
                    message: 'Deletar a Previsão de Empenho ' + prevEmpenho.cod_previsao_empenho + ' ?',
                    callback: function (confirmacao) {
                        if (confirmacao) {
                            //                            bootbox.alert('Telefone excluído com sucesso.');
                            InjecaoInfo.deletePrevEmpenho(prevEmpenho.cod_previsao_empenho).success(function (prevEmpenho) {
                                var indicePrevEmpenho = $scope.prevEmpenhos.indexOf(prevEmpenho);
                                $scope.prevEmpenhos.splice(indicePrevEmpenho, 1);
                                var msg = "<strong>Apagada</strong><br><p>A previsão de emprenho foi apagada com sucesso.</p>";
                                mensagem(msg, "success", 5000);
                                $scope.getPrevisaoEmpenho();

                            }).error(function (erro) {
                                var msg = "<strong>Erro!</strong><br><p>Não foi possível excluir a previsão de empenho.<br>Verifique se não há empenhos vinculados a mesma ou tente novamente mais tarde.</p>";
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
                            label: 'EXCLUIR',
                            className: 'btn-danger'
                        }

                    }
                });


            }

            $scope.getPrevisaoEmpenho();
        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();
});