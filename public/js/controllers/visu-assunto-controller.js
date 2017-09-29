angular.module('cidadesdigitais').controller('visuAssuntoController', function ($scope, $http) {

    $scope.assuntos = {};


    $http.get("read/assunto")
        .success(function (assunto) {
        $scope.assuntos = assunto;
    }).error(function (error) {
            console.log(error);
        });


});