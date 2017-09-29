angular.module('cidadesdigitais').controller('visuPagamentoController', function ($scope, $http, $routeParams, $resource) {
    $scope.pagamentos = [];
    $scope.busca = '';
    $scope.mensagem = '';

    if ($routeParams.pagamentoId) {
        $http.get({
            pagamentoId: $routeParams.pagamentoId
        }, function (pagamento) {
            $scope.pagamento = pagamento;
        }, function (erro) {
            $scope.mensagem = "Não é possivel retorna o pagamento";
        });
    }


    $http.get('read/otb')
        .success(function (pagamento) {
            $scope.pagamentos = pagamento
        })
        .error(function (error) {
            console.log(error);
        });

    $scope.remover = function (pagamento) {

        $http.delete('read/otb/' + pagamento.cod_otb)
            .success(function() {
            var indicePagamento = $scope.pagamentos.indexOf(pagamento);
              $scope.pagamentos.splice(indicePagamento, 1);
            $scope.mensagem = 'pagamentos ' + pagamento.cod_otb + ' foi deletado com sucesso!';
            })
            .error(function (erro) {
            $scope.mensagem = 'não foi possivel remover o pagamentos ' + pagamento.cod_otb;
                console.log('não foi possivel remover o pagamentos ' + pagamento.cod_otb);
            });
    };



});
