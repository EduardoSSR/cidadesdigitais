angular.module('cidadesdigitais').controller('addPrefeitoController', function ($scope, $http) {
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

});
