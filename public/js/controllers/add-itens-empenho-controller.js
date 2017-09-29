angular.module('cidadesdigitais').controller('addItensEmpenhoController', function($scope, $http, $routeParams, $filter) {

  $scope.itensLoteEmpenho = {};
  $scope.itensEmpenho = {};
  $scope.mensagem = '';

  $http.get('read/loteItens/')
    .success(function(empenho) {
      $scope.itensEmpenho = empenho;
      console.log($scope.itensEmpenho);
    })
    .error(function(error) {
      console.log(error);
    });

//  $http.get('read/empenhoId')
//    .success(function(empenho) {
//      $scope.itensLoteEmpenho = empenho;
//    console.log($scope.itensLoteEmpenho);
//    })
//    .error(function(error) {
//      console.log(error);
//    });




  $scope.cadastradoItens = function(itensEmpenho) {
    $scope.itensEmpenho = {
      sequencia: $scope.itensEmpenho.sequencia,
      empenho_cod_empenho: $scope.empenho.cod_empenho,
      lote_itens_lote_cod_lote: $scope.empenho.lote_cod_lote,
      lote_itens_itens_cod_item: $scope.itensEmpenho.cod_item,
      valor: $scope.itensEmpenho.valor,
      quantidade: $scope.itensEmpenho.quantidade
    }
    // console.log($scope.empenho);
    $http.post('read/itensEmpenho', $scope.itensEmpenho)
      .success(function() {
        // console.log($scope.itensEmpenho);
        // delete $scope.itensEmpenho;
        // $scope.subForItens.$setPristine();
        console.log($scope.itensEmpenho);
        $scope.mensagem = 'Item cadastrado!';
      })
      .error(function(erro) {
        console.log($scope.itensEmpenho);
        $scope.mensagem = 'Erro ao cadastradar Item!';
        console.log(erro)
      });

  };

  $scope.remover = function(itensEmpenho) {

    $http.delete('read/itensEmpenho/' + itensEmpenho.sequencia)
      .success(function() {
        var indiceEmpenho = $scope.itensEmpenho.indexOf(itensEmpenho);
        $scope.itensEmpenho.splice(indiceEmpenho, 1);
        $scope.mensagem = 'Item ' + itensEmpenho.descricao + ' foi deletado com sucesso!';
      })
      .error(function(erro) {
        $scope.mensagem = 'não foi possivel remover o item ' + itensEmpenho.descricao;
        console.log('não foi possivel remover o item ' + itensEmpenho.descricao);
      });
  };

});
