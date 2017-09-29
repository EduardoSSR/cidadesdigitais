angular.module('cidadesdigitais').controller('addCategoriaController', function ($scope, $http) {
    $scope.categorias = {};

    $http.get('read/categoria/')
        .success(function (categoria) {
            $scope.categorias = categoria;
        })
        .error(function (erro) {});


    $scope.submitCategoria = function (categoria) {
        if ($scope.formAddCategoria.$valid) {
            $scope.categoria = categoria;
            $http.post('read/categoria', $scope.categoria)
                .success(function () {
                    console.log(categoria);
                    delete $scope.categoria;
                    $scope.formAddCategoria.$setPristine();
                    $scope.mensagem = 'categoria cadastrado!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar categoria!';
                    delete $scope.categoria;
                    $scope.formAddCategoria.$setPristine();
                });

            //        javascript:location.href="cid/categoria";
        }
    };

});
