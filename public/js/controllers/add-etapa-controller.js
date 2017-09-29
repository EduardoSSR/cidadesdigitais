angular.module('cidadesdigitais').controller('addEtapaController', function ($scope, $http) {
    $scope.etapas = {};

    $http.get('read/etapa/')
        .success(function (etapa) {
            $scope.etapas = etapa;
        })
        .error(function (erro) {});


    $scope.submitEtapa = function (etapa) {
        if ($scope.formAddEtapa.$valid) {
            $scope.etapa = etapa;
            $http.post('read/etapa', $scope.etapa)
                .success(function () {
                    console.log(etapa);
                    delete $scope.etapa;
                    $scope.formAddEtapa.$setPristine();
                    $scope.mensagem = 'Etapa cadastrada!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar Etapa!';
                    delete $scope.etapa;
                    $scope.formAddEtapa.$setPristine();
                });

            //        javascript:location.href="cid/etapa";
        }
    };

});
