angular.module('cidadesdigitais').controller('editFaturaController', function ($scope, $http, $routeParams, $filter) {


    $scope.mensagem = '';
    
    if ($routeParams.faturaId) {
        $http.get("read/lotes/" + $routeParams.faturaId)
            .success(function (data) {
                $scope.fatura = {
                    num_nf: data.num_nf,
                    dt_nf: new Date($filter('date')(data.dt_nf, "yyyy-MM-dd"))
                };
            })
            .error(function (erro) {
                console.log(erro);
            });
    };

    
    $scope.mensagem = '';

    $scope.editLote = function () {

        $scope.lote = {
            cod_lote: $scope.lote.cod_lote,
            entidade_cnpj: $scope.lote.entidade_cnpj,
            contrato: $scope.lote.contrato,
            dt_inicio_vig: $filter('date')($scope.lote.dt_inicio_vig, "yyyy-MM-dd"),
            dt_final_vig: $filter('date')($scope.lote.dt_final_vig, "yyyy-MM-dd"),
            dt_reajuste: $filter('date')($scope.lote.dt_reajuste, "yyyy-MM-dd")
        };

        $http.put('read/lotes/', $scope.lote)
            .success(function () {
                console.log($scope.lote);
                $scope.mensagem = 'Lote editado!';
            })
            .error(function (erro) {
                $scope.mensagem = 'Erro ao editar lote!';
                console.log(erro)
            });

        javascript: location.href = "cid/lotes";

    };
    
    
        $scope.loteIdSearch = function (lote){
            
           var aids = {
               cod_lote : lote.cod_lote
           }
            
            $http.post('read/batata', aids)
                .success(function () {
                
                $http.get('/read/batata')
                .success(function(codloteEmpenho){
                
                $scope.codLoteEmpenhos = codloteEmpenho;
                
            }).error(function(){
                console.log(erro)
            });
                })
                .error(function (erro) {
                    console.log(erro)
                });
    };
    
        


});
