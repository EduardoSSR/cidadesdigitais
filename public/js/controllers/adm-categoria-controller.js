angular.module('cidadesdigitais').controller('admCategoriaController', function ($scope,InjecaoInfo,growl) {

    $scope.mensagem = function(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    
    /*====================== Carrega dados de categoria ======================*/
    
  $scope.getCategoria = function(){
    InjecaoInfo.getCategoria()
        .success(function(categoria){
            $scope.categorias = categoria;
            
        })
        .error(function(){  
        
        })
  }
  
  
  
  /*======================== Função para adicionar categoria ===========================*/

$scope.submitAddCategoria = function(categoria){
    
           $scope.categorias = {
            categoria_cod_categoria: categoria.categoria_cod_categoria,
            descricao: categoria.descricao
        };
       
        InjecaoInfo.postCategoria($scope.categorias)
            .success(function () {
            $scope.msg = "<strong>Adicionado</strong><br><p>O categoria "+ $scope.categoria.categoria_cod_categoria +" foi adicionada com sucesso</p>";
            $scope.mensagem($scope.msg, 'success', 5000);
            delete $scope.categoria;
               
            })
            .error(function (erro) {
                $scope.msg = "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao atualizar o(a) </p>" + $scope.entidades.nome + ", tente novamente mais tarde.";
                mensagem($scope.msg, "error", 10000);
            });   
  }

$scope.submitEditCategoria = function(categoria){
    
           $scope.categorias = {
            categoria_cod_categoria: categoria.categoria_cod_categoria,
            descricao: categoria.descricao
        };
        
        InjecaoInfo.putCategoria($scope.categorias)
            .success(function () {
            $scope.msg = "<strong>Editado</strong><br><p>O categoria "+ $scope.categoria.categoria_cod_categoria +" foi editada com sucesso</p>";
            $scope.mensagem($scope.msg, 'success', 5000);
            
               
            })
            .error(function (erro) {
                $scope.msg = "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao atualizar o(a) </p>" + $scope.categoria.categoria_cod_categoria + ", tente novamente mais tarde.";
                mensagem($scope.msg, "error", 10000);
            });   
  }


$scope.removerCategoria = function(categoria){
    
     InjecaoInfo.putCategoria($scope.categorias.categoria_cod_categoria)
            .success(function () {
            $scope.msg = "<strong>Removida</strong><br><p>A categoria "+ $scope.categoria.categoria_cod_categoria +" foi excluida com sucesso</p>";
            $scope.mensagem($scope.msg, 'success', 5000);
            
               
            })
            .error(function (erro) {
                $scope.msg = "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao atualizar o(a) </p>" + $scope.categoria.categoria_cod_categoria + ", tente novamente mais tarde.";
                mensagem($scope.msg, "error", 10000);
            }); 
    
}

$scope.getCategoria();
});
