angular.module('cidadesdigitais').controller('visuPrevEmpController', function ($scope, $http, $routeParams) {
    
    $scope.prevEmpenhos = [];
     $scope.mensagem = '';
    
    $http.get("/read/previsaoEmpenho")
            .success(function (prevEmpenho) {
            $scope.prevEmpenhos = prevEmpenho;
        
        }) 
        .error(function (error) {
            console.log(error);
        });

     if ($routeParams.previsaoEmpenhoID) {
        $http.get({
            previsaoEmpenhoID: $routeParams.previsaoEmpenhoID
        }, function (prevEmpenho) {
            $scope.prevEmpenhos = prevEmpenho;
        }, function (erro) {
            $scope.mensagem = "Não é possivel retorna o usuario";
        });
    }


});
