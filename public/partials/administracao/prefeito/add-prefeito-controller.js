angular.module('cidadesdigitais').controller('addPrefeitoController', function ($scope, $http, InjecaoInfo, growl, $window) {
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
            permitido = InjecaoInfo.permissaoAcesso(11001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    $scope.prefeitos = {};

    $http.get('read/prefeito/')
        .success(function (prefeito) {
            $scope.prefeitos = prefeito;
        })
        .error(function (erro) {});


    $scope.submitPerfeito = function (prefeito) {
        if ($scope.formAddPrefeito.$valid) {
            $scope.prefeito = prefeito;
            $http.post('read/prefeito', $scope.prefeito)
                .success(function () {
                    console.log(prefeito);
                    delete $scope.prefeito;
                    $scope.formAddPrefeito.$setPristine();
                    $scope.mensagem = 'Prefeito cadastrado!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar prefeito!';
                    delete $scope.prefeito;
                    $scope.formAddPrefeito.$setPristine();
                });

            //        javascript:location.href="cid/prefeito";
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
