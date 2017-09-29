angular.module('cidadesdigitais').controller('addItensController', function ($scope, $http){
    $scope.itens = {};

    $http.get('read/item/')
        .success(function (item) {
            $scope.itens = item;
        })
        .error(function (erro) {});


    $scope.submitItens = function (item) {
    if ($scope.formAddItens.$valid) {
        $scope.item = item;
        $http.post('read/item', $scope.item)
            .success(function () {
                console.log(item)
                delete $scope.item;
                $scope.formAddItens.$setPristine();
                $scope.mensagem = 'item cadastrado!';
            })
            .error(function (erro) {
                $scope.mensagem = 'Erro ao cadastradar item!';
                delete $scope.item;
                $scope.formAddItens.$setPristine();
            });

        //        javascript:location.href="cid/item";
    }
    };

    });