angular.module('cidadesdigitais').controller('addNaturezaDespController', function ($scope, $http) {
    $scope.naturezadesps = {};

    $http.get('read/naturezaDespesa/')
        .success(function (naturezadesp) {
            $scope.naturezadesps = naturezadesp;
           
        })
        .error(function (erro) {});


    $scope.submitNaturezaDesp = function (naturezadesp) {
        if ($scope.formAddNaturezaDesp.$valid) {
            $scope.naturezadesp = naturezadesp;
            $http.post('read/naturezadesp', $scope.naturezadesp)
                .success(function () {
                    console.log(naturezadesp)
                    delete $scope.naturezadesp;
                    $scope.formAddNaturezaDesp.$setPristine();
                    $scope.mensagem = 'Natureza de despesa cadastrada!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar natureza de despesa!';
                    delete $scope.naturezadesp;
                    $scope.formAddNaturezaDesp.$setPristine();
                });

            //        javascript:location.href="cid/naturezadesp";
        }
    };

});
