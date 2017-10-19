angular.module('cidadesdigitais').controller('addEntidadeController', function($scope, $http, growl,InjecaoInfo) {


  $scope.entidade = {};
  $scope.mensagem = '';
  $scope.telefones = {};
  $scope.esconderFormContatos= true;
    
  function mensagem (msg, type, time) {
      growl.general(msg, {ttl: time}, type);
  };
    
/*       
 
    
    /*------------------contatos--------------------*/

   
    
    /*Entidade*/
    
  $scope.submeter = function(entidade) {

    $scope.entidades = {
      cnpj: $scope.entidade.cnpj,
      nome: $scope.entidade.nome,
      endereco: $scope.entidade.endereco,
      numero: $scope.entidade.numero,
      bairro: $scope.entidade.bairro,
      cep: $scope.entidade.cep,
      nome_municipio: $scope.entidade.nome_municipio,
      uf: $scope.entidade.uf,
      observacao: $scope.entidade.observacao
    }
    console.log($scope.entidades);
   
    InjecaoInfo.postEntidade($scope.entidades)
      .success(function() {
        console.log($scope.entidades);
        $scope.msg = "<strong>Cadastrado!</strong><br>" + $scope.entidade.nome + " foi cadastrado(a) com sucesso.";
        mensagem($scope.msg, "success", 5000);
        
      })
      .error(function(erro) {
        console.log($scope.entidade);
        $scope.msg = "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao cadastrar o(a) </p>" + $scope.entidade.nome + ", tente novamente mais tarde.";
        mensagem($scope.msg, "error", 10000);
      });

      window.location.href = "cid/editEntidades/" + $scope.entidade.cnpj;
  };



});
