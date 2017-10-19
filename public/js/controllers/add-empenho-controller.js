angular.module('cidadesdigitais').controller('addEmpenhoController', function ($scope, $http, $filter, $routeParams, InjecaoInfo) {

    $scope.mensagem = '';
    $scope.previsaoEmpenho = [];


    if ($routeParams.empenhoId) {
        InjecaoInfo.getEmpenho()
            .success(function (empenho) {
                $scope.empenho = empenho;
            })
            .error(function (erro) {
                console.log(erro);
            });
    };

    InjecaoInfo.getNaturesaDespesa()
        .success(function (naturesaDespesa) {
            $scope.naturezaDespesas = naturesaDespesa
        })
        .error(function (error) {
            console.log(error);
        })


    InjecaoInfo.getPrevisaoEmpenho()
        .success(function (empenho) {
            $scope.previsaoEmpenho = empenho
        })
        .error(function (error) {
            console.log(error);
        })
    
      $scope.carregaPrevEmpenho = function(value){
            console.log(value);
             InjecaoInfo.getCarregaPrevEmpenho(value)
        .success(function (dados) {
            $scope.prevEmpenho = dados
            console.log($scope.prevEmpenho);
        })
        .error(function (error) {
            console.log(error);
        })
        };

    $scope.submitEmpenho = function () {
        $scope.empenhos = {
            cod_empenho: $scope.empenho.cod_empenho,
            previsao_empenho_cod_previsao_empenho: $scope.empenho.previsao_empenho_cod_previsao_empenho,
            data: $filter('date')($scope.empenho.data, "yyyy-MM-dd")
        };
        console.log($scope.empenhos)
        $http.post('read/empenho', $scope.empenhos)
            .success(function () {
                console.log($scope.empenhos);
                delete $scope.empenho;
                $scope.mensagem = 'empenho cadastrado!';
            })
            .error(function (erro) {
                $scope.mensagem = 'Erro ao cadastradar empenho!';
                console.log(erro)
            });

        // javascript:location.href="cid/empenho";

    };


});
