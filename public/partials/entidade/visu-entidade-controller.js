angular.module('cidadesdigitais').controller('visuEntidadeController', function ($scope, recursoEntidade, growl, $window, InjecaoInfo) {

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
                permitido = InjecaoInfo.permissaoAcesso(12002, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */

    function carregaController() {
        if (permitido) {

            /*================Pega Dados do serviço InjeçãoInfo ================*/
            recursoEntidade.query(function (entidade) {
                $scope.entidades = entidade;
            }, function (erro) {
                console.log(erro);
            });


            /*========= Função para Remover Entidade ========*/
            $scope.remover = function (entidade) {

                bootbox.confirm({
                    message: 'Deletar a Entidade ' + entidade.nome + ' ?',
                    callback: function (confirmacao) {
                        if (confirmacao) {
                            recursoEntidade.delete({
                                entidadeId: entidade.cnpj
                            }, function () {
                                var indiceEntidade = $scope.entidades.indexOf(entidade);
                                $scope.entidades.splice(indiceEntidade, 1);
                                var msg = "<strong>Excluido!</strong><br><p>Entidade deletada com sucesso.";
                                mensagem(msg, 'success', 5000);
                            }, function (erro) {
                                console.log(erro);
                                var msg = "<strong>Erro!</strong><br><p>Essa entidade está vinculada a uma informação, logo não poderá ser deletada!";
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