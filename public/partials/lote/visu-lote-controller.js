angular.module('cidadesdigitais').controller('visuLotesController', function ($scope, $http, $stateParams, InjecaoInfo, growl, $window, recursoLote) {

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
                permitido = InjecaoInfo.permissaoAcesso(14002, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */

    function carregaController() {
        if (permitido) {


            /*============== Funcao para carregar todos os lotes do banco de dados =================*/
            recursoLote.query(function (lote) {
                $scope.lotes = lote;
            }, function (erro) {
                var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });


            /*========= Função para Remover Entidade ========*/
            $scope.remover = function (lote) {

                bootbox.confirm({
                    message: 'Deletar o Lote ' + lote.cod_lote + ' ?',
                    callback: function (confirmacao) {
                        if (confirmacao) {
                            recursoLote.delete({
                                loteId: lote.cod_lote
                            }, function () {
                                var indiceLote = $scope.lotes.indexOf(lote);
                                $scope.lotes.splice(indiceLote, 1);
                                var msg = "<strong>Excluido!</strong><br><p>Lote deletada com sucesso.";
                                mensagem(msg, 'success', 5000);
                            }, function (erro) {
                                console.log(erro);
                                var msg = "<strong>Erro!</strong><br><p>Essa lote está vinculada a uma informação, logo não poderá ser deletada!";
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
            };

        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();
});