angular.module('cidadesdigitais').controller('addTipologiaController', function ($scope, $http, InjecaoInfo, growl, $window) {
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
            permitido = InjecaoInfo.permissaoAcesso(27001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    $scope.tipologias = {};

    $http.get('read/tipologia/')
        .success(function (tipologia) {
            $scope.tipologias = tipologia;
        })
        .error(function (erro) {});


    $scope.submitTipologia = function (tipologia) {
        if ($scope.formAddTipologia.$valid) {
            $scope.tipologia = tipologia;
            $http.post('read/tipologia', $scope.tipologia)
                .success(function () {
                    console.log(tipologia);
                    delete $scope.tipologia;
                    $scope.formAddTipologia.$setPristine();
                    $scope.mensagem = 'Tipologia cadastrada!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar tipologia!';
                    delete $scope.tipologia;
                    $scope.formAddTipologia.$setPristine();
                });

            //        javascript:location.href="cid/tipologia";
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
