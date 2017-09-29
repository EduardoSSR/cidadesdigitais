angular.module('cidadesdigitais').controller('addPagamentoController', function ($scope, $http, $filter) {
   $scope.pagamento = [];
    $scope.mensagem = '';

    $scope.submeter = function (pagamento) {
        console.log(pagamento);
        if ($scope.pagamentoForm.$valid) {
            $scope.pagamento = {
                cod_otb: $scope.pagamento.numOrdemTransfBanc,
                dt_pgto: $filter('date')($scope.pagamento.datapag,"yyyy-MM-dd")
            }
            console.log($scope.pagamento);
            $http.post('read/otb', $scope.pagamento)
                .success(function () {
                    console.log($scope.pagamento);
                    delete $scope.pagamento;
                    $scope.pagamentoForm.$setPristine();
                    console.log($scope.pagamento);
                    $scope.mensagem = 'Pagamento cadastrado!';
                })
                .error(function (erro) {
                    console.log($scope.pagamento);
                    $scope.mensagem = 'Erro ao cadastradar pagamento!';
                    console.log(erro)
                });
        }
    };

    
    
});
