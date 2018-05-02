angular.module('cidadesdigitais').controller('addtipoDoItemController', function ($scope, $http, InjecaoInfo, growl, $window){
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
            permitido = InjecaoInfo.permissaoAcesso(28001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    $scope.tipoDoItens = {};

    $http.get('read/tipoDoItem/')
        .success(function (tipoDoItem) {
            $scope.tipoDoItens = tipoDoItem;
        })
        .error(function (erro) {});


    $scope.submitTipoDoitem = function (tipoDoItem) {
        if ($scope.formAddTipoDoItem.$valid) {
            $scope.tipoDoItem = tipoDoItem;
            $http.post('read/tipoDoItem', $scope.tipoDoItem)
                .success(function () {
                    console.log(tipoDoItem)
                    delete $scope.tipoDoItem;
                    $scope.formAddTipoDoItem.$setPristine();
                    $scope.mensagem = 'Assunto cadastrado!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar Assunto!';
                    delete $scope.tipoDoItem;
                    $scope.formAddTipoDoItem.$setPristine();
                });

            //        javascript:location.href="cid/tipoDoItem";
        }
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
