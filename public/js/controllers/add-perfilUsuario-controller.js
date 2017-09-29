angular.module('cidadesdigitais').controller('addPerfilUsuarioController', function ($scope, $http) {
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

});
