angular.module('cidadesdigitais').controller('visuEmpenhoController', function ($scope, $http, $routeParams) {

     $scope.empenhos = {};
     $scope.mensagem = '';

     if ($routeParams.empenhoId) {
         $http.get({
             empenhoId: $routeParams.empenhoId
         }, function () {
             $scope.empenhos = empenho;
         }, function (erro) {
             $scope.mensagem = "Não é possivel retorna o usuario";
         });
     }


         $http.get('read/empenho')
             .success(function (empenho) {
                 $scope.empenhos = empenho
             })
             .error(function (error) {
                 console.log(error);
             });


    $scope.deletarEmpenho = function (empenho) {
        $http.delete('read/empenho/' + empenho.cod_empenho)
        .success(function () {
             var indiceempenho = $scope.empenhos.indexOf(empenho);
            $scope.empenhos.splice(indiceempenho, 1);
           
        }).error(function (error) {
            console.log("erro");


        });


    };


});
