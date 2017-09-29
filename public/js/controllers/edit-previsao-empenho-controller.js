angular.module('cidadesdigitais').controller('editPrevisaoEmpenhoController', function ($scope, $http, $routeParams, $filter) {
    

     if ($routeParams.previsaoEmpenhoID) {
        $http.get('read/previsaoEmpenho/' + $routeParams.previsaoEmpenhoID)
            .success(function (prevEmpenho) {
            $scope.prevEmpenhos = {
            cod_previsao_empenho: prevEmpenho.cod_previsao_empenho,
            lote_cod_lote: prevEmpenho.lote_cod_lote,
            data: new Date($filter('date')(prevEmpenho.data,"yyyy-MM-dd")),
            tipo: prevEmpenho.tipo,
            ano_referencia: prevEmpenho.ano_referencia
        }; 
            console.log($scope.prevEmpenhos);
            })
            .error(function (erro) {
                console.log(erro);
            });
         
         $http.get('read/loteItens/' + $routeParams.previsaoEmpenhoID)
        .success(function (visuItensEmpenho) {
            $scope.visuItensEmpenhos = visuItensEmpenho;
           console.log($scope.visuItensEmpenhos);
        })
            .error(function (error) {
            console.log(error);
        });
    };


});

