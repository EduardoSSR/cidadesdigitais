angular.module('cidadesdigitais').controller('addMunicipiosController', function ($scope, $http) {
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

});
