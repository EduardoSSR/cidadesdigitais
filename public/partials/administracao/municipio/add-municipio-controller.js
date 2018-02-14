angular.module('cidadesdigitais').controller('addMunicipiosController', function ($scope, $http, InjecaoInfo, growl, $window) {
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
            permitido = InjecaoInfo.permissaoAcesso(24001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    $scope.municipios = {};

    $http.get('read/municipio/')
        .success(function (municipio) {
            $scope.municipios = municipio;
        })
        .error(function (erro) {});


    $scope.submitMunicipios = function (municipio) {
        if ($scope.formAddmunicipios.$valid) {
            $scope.municipio = municipio;
            $http.post('read/municipio', $scope.municipio)
                .success(function () {
                    console.log(municipio)
                    delete $scope.municipio;
                    $scope.formAddmunicipios.$setPristine();
                    $scope.mensagem = 'Município cadastrado!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar município!';
                    delete $scope.municipio;
                    $scope.formAddmunicipios.$setPristine();
                });

            //        javascript:location.href="cid/municipio";
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
