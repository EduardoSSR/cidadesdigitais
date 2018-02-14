angular.module('cidadesdigitais').controller('addEtapaController', function ($scope, $http, InjecaoInfo, growl, $window) {
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
            permitido = InjecaoInfo.permissaoAcesso(22001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    $scope.etapas = {};

    $http.get('read/etapa/')
        .success(function (etapa) {
            $scope.etapas = etapa;
        })
        .error(function (erro) {});


    $scope.submitEtapa = function (etapa) {
        if ($scope.formAddEtapa.$valid) {
            $scope.etapa = etapa;
            $http.post('read/etapa', $scope.etapa)
                .success(function () {
                    console.log(etapa);
                    delete $scope.etapa;
                    $scope.formAddEtapa.$setPristine();
                    $scope.mensagem = 'Etapa cadastrada!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar Etapa!';
                    delete $scope.etapa;
                    $scope.formAddEtapa.$setPristine();
                });

            //        javascript:location.href="cid/etapa";
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
