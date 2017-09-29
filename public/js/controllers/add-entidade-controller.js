angular.module('cidadesdigitais').controller('addEntidadeController', function($scope, $http, growl) {


  $scope.entidade = {};
  $scope.mensagem = '';
  $scope.telefones = {};
  $scope.esconderFormContatos= true;
    
  function mensagem (msg, type, time) {
      growl.general(msg, {ttl: time}, type);
  };
    
       
 $scope.submeterAddTelefones = function (telefone) {
     
     
      $scope.telefones = {
        contato_cod_contato: $scope.entidade.cod_contato,
        telefone: $scope.telefone.fone,
        tipo: $scope.telefone.tipo
      };
      console.log($scope.telefones);
    $http.post('read/telefone', $scope.telefones)
      .success(function() {
        console.log($scope.telefones);
        delete $scope.telefones;
        console.log($scope.telefones);
        $scope.mensagem = 'Entidade cadastrado!';
      })
      .error(function(erro) {
        console.log($scope.telefones);
        $scope.mensagem = 'Erro ao cadastradar Entidade!';
        console.log(erro)
      });
    };
    
    /*------------------contatos--------------------*/
  
       $http.get('read/contato/')
        .success(function(contato){
           $scope.contatos = contato;
            
     })
        .error(function(erro){
            console.log(erro);
        });
 
    
      $scope.AddContatos = function (contato) {
  
      $scope.contatos = {
        entidade_cnpj: $scopeentidades.cnpj,
        nome: $scope.contato.nome,
        email: $scope.contato.email,
        funcao: $scope.contato.funcao
      };
      
      console.log($scope.contatos)
      
    $http.post('read/contato', $scope.contatos)
      .success(function() {
        console.log($scope.contatos)
        delete $scope.contato;
        $scope.mensagem = 'Entidade cadastrado!';
      })
      .error(function(erro) {
        console.log($scope.contato);
        $scope.mensagem = 'Erro ao cadastradar Entidade!';
        console.log(erro)
      });
    };
    
    $http.get('read/entidade/')
        .success(function(entidade){
           $scope.entidades = entidade;
         
        })
        .error(function(erro){
            console.log(erro);
        });
    
    
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
   
    $http.post('read/entidades', $scope.entidades)
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
