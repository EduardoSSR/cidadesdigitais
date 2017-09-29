angular.module('cidadesdigitais').controller('VisuUsuarioController', function ($scope, $http, $routeParams, $resource,growl) {
    $scope.usuarios = [];
    $scope.busca = '';
    $scope.mensagem = '';
    
    
    function mensagem (msg, type, time){
        growl.general(msg,{ttl: time}, type);
    }

    if ($routeParams.usuarioId) {
        $http.get({
            usuarioId: $routeParams.usuarioId
        }, function (usuario) {
            $scope.usuario = usuario;
        }, function (erro) {
            $scope.mensagem = "Não é possivel retorna o usuario";
        });
    }


    $http.get('read/usuario')
        .success(function (usuario) {
            $scope.usuarios = usuario
        })
        .error(function (error) {
            console.log(error);
        });

    $scope.remover = function (usuario) {

        $http.delete('read/usuario/' + usuario.cod_usuario)
            .success(function() {
            var indiceUsuario = $scope.usuarios.indexOf(usuario);
              $scope.usuarios.splice(indiceUsuario, 1);
           $scope.msg = "<strong>Excluido</strong><br><p>O usuário foi excluido com sucesso </p>";
                  mensagem($scope.msg, "success",5000)
            })
            .error(function (erro) {
            $scope.msg = "<strong>Editado</strong><br><p>O usuário " + $scope.usuario.nome  + " foi editado com sucesso </p>";
                  mensagem($scope.msg, "warning",5000)
                console.log('não foi possivel remover o usuario ' + usuario.nome);
            });
    };




});
