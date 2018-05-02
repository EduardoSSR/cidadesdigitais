angular.module('cidadesdigitais').controller('visuLotesController', function ($scope, $http, $routeParams, InjecaoInfo, growl, $window) {

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
            $scope.carregarLote = function () {
                $http.get("/read/lotes")
                    .success(function (lote) {
                        $scope.lotes = lote;
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    })
            };


            /*============== Funcao para excluir um lote do banco de dados =================*/
            $scope.deletar = function (lote) {
                bootbox.confirm({
                    message: 'Tem certeza que deseja deletar o lote <strong>' + lote.cod_lote + '</strong> ?',
                    callback: function (confirmacao) {
                        if (confirmacao) {
                            $http.delete('read/lotes/' + lote.cod_lote)
                                .success(function () {
                                    var msg = '<strong>Excluído</strong><br><p>O lote <strong>' + lote.cod_lote + '</strong> foi excluido com sucesso.</p>';
                                    mensagem(msg, "success", 5000);
                                    var indiceLote = $scope.lotes.indexOf(lote);
                                    $scope.lotes.splice(indiceLote, 1);
                                }).error(function (error) {
                                    var msg = '<strong>Erro!</strong><br><p>Ocorreu um erro ao excluir este lote. Por favor, verifique se existe dados que precisam ser apagados ou tente novamente mais tarde.</p>';
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


            /*============== Funcao para carregar os lotes do banco de dados na pagina =================*/
            $scope.carregarLote();
        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();
});
