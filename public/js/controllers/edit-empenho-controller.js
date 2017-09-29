angular.module('cidadesdigitais').controller('editarEmpenhoController', function ($scope, $http, $routeParams, $filter) {
    
    /*---------------------Função para pegar dados de empenho---------------------*/
  
     
    if($routeParams.empenhoId){
        $http.get('read/empenhoAll/' + $routeParams.empenhoId)
        .success(function(empenho){
            
               $scope.empenhos = {
                    cod_empenho: empenho.cod_empenho,
                    previsao_empenho_cod_previsao_empenho: empenho.previsao_empenho_cod_previsao_empenho,
                    data: new Date($filter('date')(empenho.data, "yyyy-MM-dd"))
                };
            
            console.log($scope.empenhos);
        })
        .error(function(erro){
            console.log(erro);
        });
    }
    
     if($routeParams.empenhoId){
        $http.get('read/empenhoItens/' + $routeParams.empenhoId)
        .success(function(empenhoItem){
            $scope.empenhoItens = empenhoItem;
            console.log($scope.empenhoItens);
        })
        .error(function(erro){
            console.log(erro);
        });
    }

    
        /*---------------------Função para deletar dado ID empenho---------------------*/
      
      $scope.deletarEmpenho = function (empenho) {
        $http.delete('read/empenhoItens' + $routeParams.empenhoId)
        .success(function () {
             var indicefatura = $scope.empenhos.indexOf(empenho);
            $scope.empenhos.splice(indiceempenho, 1);
            
        }).error(function (error) {
            console.log("erro");

        });
    };
    
      
     
    


});
