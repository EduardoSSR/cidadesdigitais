angular.module('cidadesdigitais').controller('VisuUsuarioController', function ($scope, $stateParams, $resource, growl, InjecaoInfo, $http, $window) {
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
                permitido = InjecaoInfo.permissaoAcesso(11002, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    function carregaController() {
        if (permitido) {
            $scope.usuarios = [];
            $scope.busca = '';
            if ($stateParams.usuarioId) {
                $http.get({
                    usuarioId: $stateParams.usuarioId
                }, function (usuario) {
                    $scope.usuario = usuario;
                }, function () {
                    $scope.mensagem = "Não é possivel retorna o usuario";
                });
            }

            InjecaoInfo.getUsuario().success(function (usuario) {
                $scope.usuarios = usuario
            }).error(function (error) {
                console.log(error);
            });

            $scope.remover = function (usuario) {
                bootbox.confirm({
                    message: 'Tem certeza que deseja deletar o usuário <strong>' + usuario.nome + '</strong> ?',
                    callback: function (confirmacao) {
                        if (confirmacao) {
                            $http.delete('read/usuario/' + usuario.cod_usuario).success(function () {
                                var indiceUsuario = $scope.usuarios.indexOf(usuario);
                                $scope.usuarios.splice(indiceUsuario, 1);
                                var msg = '<strong>Excluido</strong><br><p>O usuário <strong>' + usuario.nome + '</strong> foi excluído com sucesso </p>';
                                mensagem(msg, "success", 5000);
                            }).error(function () {
                                var msg = '<strong>Erro!</strong><br><p>Ocorreu um erro ao excluir este usuário. Por favor, tente novamente mais tarde.</p>';
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
        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        }
    }
    valida();
});
