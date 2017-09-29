angular.module('cidadesdigitais').controller('editUsuarioController', function ($scope, $http, $routeParams, growl) {

    $scope.usuario = {};
    $scope.mensagem = '';
    
    
    function mensagem (msg, type, time){
        growl.general(msg,{ttl: time}, type);
    }

    if($routeParams.usuarioId){
        $http.get('read/usuario/' + $routeParams.usuarioId)
        .success(function(usuario){
            $scope.usuario = usuario;
        })
        .error(function(erro){
            console.log(erro);
        });
    }

    
    
    $scope.submeter = function (usuario) {
         if(!$scope.formularioAddUsuario.$pristine){
             
             $scope.usuario={
            cod_usuario: $scope.usuario.cod_usuario,
            perfil_cod_perfil: $scope.usuario.perfil_cod_perfil,
            nome: $scope.usuario.nome,
            login: $scope.usuario.login,
            email: $scope.usuario.email,
            telefone: $scope.usuario.telefone.replace(/[^\d]+/g,'')
        };

        
        if($scope.formularioAddUsuario.$valid) {
            if($scope.usuario.cod_usuario == $routeParams.usuarioId){
               
                $http.put('read/usuario/', $scope.usuario)
                .success(function(){
                    console.log($scope.usuario);
                   $scope.msg = "<strong>Editado</strong><br><p>O usuário " + $scope.usuario.nome  + " foi editado com sucesso </p>";
                  mensagem($scope.msg, "success",5000)
                    $scope.formularioAddUsuario.$setPristine();
                    
                }).error(function (erro) {
                    $scope.mensagem = 'Não foi possivel alterar as inforamções do usuario!';
                    console.log(erro)
                });
            }
        }
             
             
             
         }else{
             $scope.msg = "<strong>Aviso</strong><br><p>Nenhum campo foi alterado!!!</p>";
                  mensagem($scope.msg, "warning",5000)
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
