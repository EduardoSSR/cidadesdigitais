angular.module('cidadesdigitais').controller('visuEmpenhoController', function ($scope, $http, $routeParams, InjecaoInfo, growl, $window) {
/*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem (msg, type, time) {
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
            permitido = InjecaoInfo.permissaoAcesso(15002, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
     $scope.empenhos = {};
     $scope.mensagem = '';

     if ($routeParams.empenhoId) {
         $http.get({
             empenhoId: $routeParams.empenhoId
         }, function () {
             $scope.empenhos = empenho;
         }, function (erro) {
             $scope.mensagem = "Não é possivel retorna o usuario";
         });
     }


         $http.get('read/empenho')
             .success(function (empenho) {
                 $scope.empenhos = empenho
             })
             .error(function (error) {
                 console.log(error);
             });


    $scope.deletarEmpenho = function (empenho) {
        
         bootbox.confirm({
                    message: 'Tem certeza deletar empenho ' + empenho.cod_empenho + ' ?',
                    callback: function (confirmacao) {
                        if (confirmacao) {
                            $http.delete('read/empenho/' + empenho.cod_empenho)
                                .success(function () {
                                     var indiceempenho = $scope.empenhos.indexOf(empenho);
                                    $scope.empenhos.splice(indiceempenho, 1);

                                }).error(function (error) {
                                    var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao excluir este empenho. Por favor, tente novamente mais tarde.</p>";
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
}
    else {
        var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
        mensagem(msg, "warning", 5000);
        $window.history.back();
    };
    }
    valida();

});
