angular.module('cidadesdigitais').controller('addItensController', function ($scope, $http, InjecaoInfo, growl, $window){
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
            permitido = InjecaoInfo.permissaoAcesso(23001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    $scope.itens = {};

    $http.get('read/item/')
        .success(function (item) {
            $scope.itens = item;
        })
        .error(function (erro) {});


    $scope.submitItens = function (item) {
    if ($scope.formAddItens.$valid) {
        $scope.item = item;
        $http.post('read/item', $scope.item)
            .success(function () {
                console.log(item)
                delete $scope.item;
                $scope.formAddItens.$setPristine();
                $scope.mensagem = 'item cadastrado!';
            })
            .error(function (erro) {
                $scope.mensagem = 'Erro ao cadastradar item!';
                delete $scope.item;
                $scope.formAddItens.$setPristine();
            });

        //        javascript:location.href="cid/item";
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