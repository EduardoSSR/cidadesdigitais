angular.module('cidadesdigitais').controller('addPerfilUsuarioController', function ($scope, $http, InjecaoInfo, growl, $window) {
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
    $scope.perfilUsuarios = {};

    $http.get('read/perfilUsuario/')
        .success(function (perfilUsuario) {
            $scope.perfilUsuarios = perfilUsuario;
        })
        .error(function (erro) {});


    $scope.submitPerfilUsuario = function (perfilUsuario) {
        if ($scope.formAddPerfilUsuario.$valid) {
            $scope.perfilUsuario = perfilUsuario;
            $http.post('read/perfilUsuario', $scope.perfilUsuario)
                .success(function () {
                    console.log(perfilUsuario);
                    delete $scope.perfilUsuario;
                    $scope.formAddPerfilUsuario.$setPristine();
                    $scope.mensagem = 'Perfil do usuário cadastrado!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar Perfil do usuário!';
                    delete $scope.perfilUsuario;
                    $scope.formAddPerfilUsuario.$setPristine();
                });

            //        javascript:location.href="cid/perfilUsuario";
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
