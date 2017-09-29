angular.module('cidadesdigitais').controller('visuFaturaController', function ($scope, $http) {
    
    $scope.faturas = [];
     $scope.mensagem = '';
    
    var carregarfatura = function () {
        $http.get("/read/fatura")
            .success(function (fatura) {
            $scope.faturas = fatura;
        });
    };

    

    $scope.deletar = function (fatura) {
        $http.delete('read/fatura/' + fatura.num_nf)
        .success(function () {
            
             var indicefatura = $scope.fatura.indexOf(fatura);
            $scope.fatura.splice(indicefatura, 1);
            $scope.mensagem = 'Fatura ' + fatura.num_nf + ' foi deletada com sucesso!';



        }).error(function (error) {
            console.log("erro");


        });


    };
    
    carregarfatura();

});