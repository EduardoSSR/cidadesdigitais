angular.module('cidadesdigitais').controller('addtipoDoItemController', function ($scope, $http){
$scope.tipoDoItens = {};

    $http.get('read/tipoDoItem/')
        .success(function (tipoDoItem) {
            $scope.tipoDoItens = tipoDoItem;
        })
        .error(function (erro) {});


    $scope.submitTipoDoitem = function (tipoDoItem) {
        if ($scope.formAddTipoDoItem.$valid) {
            $scope.tipoDoItem = tipoDoItem;
            $http.post('read/tipoDoItem', $scope.tipoDoItem)
                .success(function () {
                    console.log(tipoDoItem)
                    delete $scope.tipoDoItem;
                    $scope.formAddTipoDoItem.$setPristine();
                    $scope.mensagem = 'Assunto cadastrado!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar Assunto!';
                    delete $scope.tipoDoItem;
                    $scope.formAddTipoDoItem.$setPristine();
                });

            //        javascript:location.href="cid/tipoDoItem";
        }
    };

});
