angular.module('cidadesdigitais').controller('addPrevEmpController', function($scope, $http, $filter){

    $scope.tipos = [{name: "Reajuste", value: "R"},{name: "Original", value: "O"}];
    
    $scope.mensagem = '';
    
        $http.get('read/naturezaDespesa')
        .success(function (naturezaDespesa) {
            $scope.naturezaDespesas = naturezaDespesa
            console.log($scope.naturezaDespesas);
        })
        .error(function (error) {
            console.log(error);
        })
    
      
        
    $scope.submeter = function(){
        
        $scope.prevEmpenho = {
            lote_cod_lote: $scope.prevEmp.cod_lote,
            data: $filter('date')($scope.prevEmp.data,"yyyy-MM-dd"),
            tipo: $scope.prevEmp.tipo,
            ano_referencia: $scope.prevEmp.ano_referencia,
            natureza_despesa_cod_natureza_despesa: $scope.prevEmp.natDesp
        };
        
        $http.post('read/previsaoEmpenho', $scope.prevEmpenho)
                .success(function () {
                console.log($scope.prevEmpenho);
                delete $scope.prevEmpenho;
                    $scope.prevempForm.$setPristine();
                console.log($scope.prevEmpenho);
                    $scope.mensagem = 'Previsão de empenho cadastrada!';
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar previsão de empenho!';
                    console.log(erro)
                });
    

    };

});            