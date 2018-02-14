angular.module('cidadesdigitais').controller('visuFaturaController', function ($scope, InjecaoInfo, growl, $window) {
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
                permitido = InjecaoInfo.permissaoAcesso(17002, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */

    function carregaController() {
        if (permitido) {

            $scope.faturas = [];
            $scope.mensagem = '';

            var carregarfatura = function () {
                InjecaoInfo.getFatura()
                    .success(function (fatura) {
                        $scope.faturas = fatura;
                    });
            };



            $scope.deletar = function (fatura) {
                bootbox.confirm({
                    message: 'Tem certeza que deseja deletar a fatura <strong>' + fatura.num_nf + '</strong> ?',
                    callback: function (confirmacao) {
                        if (confirmacao) {
                            InjecaoInfo.delFatura(fatura)
                                .success(function () {
                                    var indicefatura = $scope.faturas.indexOf(fatura);
                                    $scope.faturas.splice(indicefatura, 1);
                                    var msg = "<strong>Excluído</strong><br><p>A fatura " + fatura.num_nf + " foi excluída com sucesso.</p>";
                                    mensagem(msg, "success", 5000);

                                }).error(function (error) {
                                    var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao excluir esta fatura. Por favor, tente novamente mais tarde.</p>";
                                    mensagem(msg, "error", 5000);
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

            carregarfatura();
        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();
});
