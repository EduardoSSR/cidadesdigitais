angular.module('cidadesdigitais').controller('visuPerfilController', function ($scope, $http){
    
    $scope.perfisUsuarios = [];
    

    $http.get('read/perfil')
        .success(function (perfil) {
            $scope.perfisUsuarios = perfil;
        })
        .error(function (error) {
            console.log(error);
        })
});