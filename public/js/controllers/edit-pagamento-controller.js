angular.module('cidadesdigitais').controller('editPagamentoController', function ($scope, $http, $routeParams) {

    $scope.pagamento = [];
    $scope.mensagem = '';;

    if($routeParams.pagamentoId){
        $http.get('read/otb/' + $routeParams.pagamentoId)
        .success(function(pagamento){
            $scope.pagamento = pagamento;
        })
        .error(function(erro){
            console.log(erro);
        });
    }
    
   /* $http.get('read/otb/').success(function(response){$scope.pagamento = response;}
    );*/

    $scope.submeter = function (pagamento) {
        $scope.pagamento = {
                cod_otb: $scope.pagamento.numOrdemTransfBanc,
              dt_pgto: $filter('date')($scope.pagamento.datapag,"yyyy-MM-dd")
        };
        console.log($scope.pagamento);
        
        if ($scope.pagamentoForm.$valid) {
            console.log($scope.pagamento);
            if($scope.pagamento.cod_otb == $routeParams.pagamentoId){
                console.log($scope.pagamento);
                $http.put('read/otb/', $scope.pagamento)
                .success(function(){
                    $scope.mensagem = 'As informações do pagamento ' + $scope.pagamento.cod_otb + ' Foram alteradas com sucesso!';
                }).error(function (erro) {
                    $scope.mensagem = 'Não foi possivel alterar as inforamções do entidade!';
                    console.log(erro)
                });
            }
        }
    };



/*      if($routeParams.usuarioId) {
    recursoFoto.get({usuarioId: $routeParams.usuarioId}, function(usuario) {
      $scope.usuario = usuario;
    }, function(erro) {
      $scope.mensagem = 'Não foi possível obter a usuario'
    });
  }*/

});