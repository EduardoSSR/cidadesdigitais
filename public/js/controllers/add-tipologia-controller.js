angular.module('cidadesdigitais').controller('addTipologiaController', function ($scope, $http) {
    $scope.tipologias = {};

    $http.get('read/tipologia/')
        .success(function (tipologia) {
            $scope.tipologias = tipologia;
        })
        .error(function (erro) {});


    $scope.submitTipologia = function (tipologia) {
        if ($scope.formAddTipologia.$valid) {
            $scope.tipologia = tipologia;
            $http.post('read/tipologia', $scope.tipologia)
                .success(function () {
                    console.log(tipologia);
                    delete $scope.tipologia;
                    $scope.formAddTipologia.$setPristine();
                    $scope.mensagem = 'Tipologia cadastrada!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar tipologia!';
                    delete $scope.tipologia;
                    $scope.formAddTipologia.$setPristine();
                });

            //        javascript:location.href="cid/tipologia";
        }
    };

});
