angular.module('cidadesdigitais').controller('addAssuntoController', function ($scope, $http) {
    $scope.assuntos = {};

    $http.get('read/assunto/')
        .success(function (assunto) {
            $scope.assuntos = assunto;
        })
        .error(function (erro) {});


    $scope.submitAssunto = function (assunto) {
        if ($scope.formAssuntoAdd.$valid) {
            $scope.assunto = assunto;
            $http.post('read/assunto', $scope.assunto)
                .success(function () {
                    delete $scope.assunto;
                    $scope.formAssuntoAdd.$setPristine();
                    $scope.mensagem = 'Assunto cadastrado!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar Assunto!';
                    delete $scope.assunto;
                    $scope.formAssuntoAdd.$setPristine();
                });

            //        javascript:location.href="cid/assunto";
        }
    };

});
