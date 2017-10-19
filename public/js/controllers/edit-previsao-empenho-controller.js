angular.module('cidadesdigitais').controller('editPrevisaoEmpenhoController', function ($scope, $http, $routeParams, $filter) {
    

     if ($routeParams.previsaoEmpenhoID) {
        $http.get('read/previsaoEmpenho/' + $routeParams.previsaoEmpenhoID)
            .success(function (prevEmpenho) {
            $scope.prevEmpenhos = {
            cod_previsao_empenho: prevEmpenho.cod_previsao_empenho,
            lote_cod_lote: prevEmpenho.lote_cod_lote,
            natureza_despesa_cod_natureza_despesa: prevEmpenho.descricao,
            data: new Date($filter('date')(prevEmpenho.data,"yyyy-MM-dd")),
            tipo: prevEmpenho.tipo,
            ano_referencia: prevEmpenho.ano_referencia
        };
            })
            .error(function (erro) {
                console.log(erro);
            });
         
         $scope.getLotes = function(){
             $http.get('read/loteItens/' + $routeParams.previsaoEmpenhoID)
                .success(function (visuItensEmpenho) {
                    $scope.visuItensEmpenhos = visuItensEmpenho;
                })
                    .error(function (error) {
                    console.log(error);
                });
            };
        };
    
    
    $scope.editPrevEmpenho = function(){
        console.log($scope.prevEmpenhos);
    };

    $scope.getLotes();

});

