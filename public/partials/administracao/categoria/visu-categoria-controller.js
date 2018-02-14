angular.module('cidadesdigitais').controller('admCategoriaController', function ($scope,InjecaoInfo,growl,$routeParams,$http, $window) {

    function mensagem(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    
    
  /* --INICIO-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    var permitido = true;

    function valida() {
    $scope.modulos = '';
    InjecaoInfo.getUsuarioModulos($window.sessionStorage.idUser)
        .success(function (modulo) {
            permitido = InjecaoInfo.permissaoAcesso(20002, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    
    
    /*====================== Carrega dados de categoria ======================*/
      
      $scope.getCategoria = function(){

        InjecaoInfo.getCategoria()
            .success(function(categoria){
                $scope.categorias = categoria;

            })
            .error(function(){  

            })
    }
      
      
    
  $scope.getCategoriaById = function(){
    InjecaoInfo.getCategoriaById($routeParams.idCategoria)
        .success(function (categoria) {
            $scope.categorias = categoria;
        
        }).error(function (erro) {
            console.log(erro);
        });
    }
  
  
  
  /*======================== Função para adicionar categoria ===========================*/

$scope.submitCategoria = function(categoria){
    
           $scope.categorias = {
            cod_categoria: categoria.cod_categoria,
            descricao: categoria.descricao
        };
       
        InjecaoInfo.postCategoria($scope.categorias)
            .success(function () {
            var msg = "<strong>Adicionado</strong><br><p>A categoria "+ $scope.categoria.cod_categoria +" foi adicionada com sucesso</p>";
            mensagem(msg, 'success', 5000);
			$scope.formAddCategoria.$setPristine();
            delete $scope.categoria;
               
            })
            .error(function (erro) {
                var msg = "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao atualizar o(a) </p>" + $scope.categoria.nome + ", tente novamente mais tarde.";
                mensagem(msg, "error", 10000);
            });   
  }

$scope.submitEditCategoria = function(){
        
        console.log($scope.categorias);
        InjecaoInfo.putCategoria($scope.categorias)
            .success(function () {
            var msg = "<strong>Editado</strong><br><p>O categoria foi editada com sucesso</p>";
			mensagem(msg, 'success', 5000);
               
            })
            .error(function (erro) {
                var msg = "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao atualizar o(a) </p>" + $scope.categoria.cod_categoria + ", tente novamente mais tarde.";
				
                mensagem(msg, "error", 10000);
            });   
  }


$scope.removerCategoria = function(categoria){
    
        console.log(categoria)
      $http.delete('read/categoria/' + categoria.cod_categoria)
            .success(function () {
            var msg = "<strong>Removida</strong><br><p>A categoria foi excluida com sucesso</p>";
            mensagem(msg, 'success', 5000);
            
            })
            .error(function (erro) {
                var msg = "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao atualizar o(a) </p>" + $scope.categoria.cod_categoria + ", tente novamente mais tarde.";
                mensagem(msg, "error", 10000);
            }); 
    
}

 /*if(window.location.href == "http://172.25.117.3:3000/categoria"){
    $scope.getCategoria();
 }else if(window.location.href == "http://172.25.117.3:3000/editCategoria/" + $routeParams.idCategoria){
     $scope.getCategoriaById();
 }
*/

      
    if($routeParams.idCategoria){
         $scope.getCategoriaById();
    }else{
          $scope.getCategoria();
    }

    
}
    else {
        var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
        mensagem(msg, "warning", 5000);
        $window.history.back();
    };
    }
    valida();

});
