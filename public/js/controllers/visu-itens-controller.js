angular.module('cidadesdigitais').controller('visuItensController', function ($scope, $http) {

    $scope.itens = [];
     $scope.mensagem = '';
    
    var carregarItens = function () {
        $http.get("/read/itens")
            .success(function (item) {
            $scope.itens = item;
        });
    };


    carregarItens();

});