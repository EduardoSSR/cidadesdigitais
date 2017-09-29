angular.module('cidadesdigitais').controller('addClasseEmpController', function ($scope, $http) {
    $scope.classeEmps = {};

    $http.get('read/classeEmp/')
        .success(function (classeEmp) {
            $scope.classeEmps = classeEmp;
        })
        .error(function (erro) {});


    $scope.submitClasseEmp = function (classeEmp) {
        if ($scope.formularioAddClassEmp.$valid) {
            $scope.classeEmp = classeEmp;
            $http.post('read/ClasseEmp', $scope.classeEmp)
                .success(function () {
                    console.log(classeEmp);
                    delete $scope.ClasseEmp;
                    $scope.formularioAddClassEmp.$setPristine();
                    $scope.mensagem = 'Classe de empenho cadastrada!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar Classe de empenho!';
                    delete $scope.classeEmp;
                    $scope.formularioAddClassEmp.$setPristine();
                });

            //        javascript:location.href="cid/classeEmp";
        }
    };

});
