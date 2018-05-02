angular.module('cidadesdigitais').controller('editUsuarioController', function ($scope, $http, $routeParams, growl, $window, InjecaoInfo) {
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    }
    
    /* --INICIO-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    var permitido = true;

    function valida() {
    $scope.modulos = '';
    InjecaoInfo.getUsuarioModulos($window.sessionStorage.idUser)
        .success(function (modulo) {
            permitido = InjecaoInfo.permissaoAcesso(11003, modulo);
            validaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function validaController(){
    if (permitido) {
        carregaController();
    }
    else {
        if($routeParams.usuarioId == $window.sessionStorage.idUser){
            carregaController();
        }else{
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        }
        
    };
    }
     function carregaController(){
         $scope.usuario = {};
        
        if ($routeParams.usuarioId) {
            $http.get('read/usuario/' + $routeParams.usuarioId).success(function (usuario) {
                $scope.usuario = usuario;
            }).error(function (erro) {
                console.log(erro);
            });
        }
        $scope.submeter = function (usuario) {
            if (!$scope.formularioAddUsuario.$pristine) {
                $scope.usuario = {
                    cod_usuario: $scope.usuario.cod_usuario
                    , nome: $scope.usuario.nome
                    , login: $scope.usuario.login
                    , email: $scope.usuario.email
                    , telefone: $scope.usuario.telefone.replace(/[^\d]+/g, '')
                };
                if ($scope.formularioAddUsuario.$valid) {
                    if ($scope.usuario.cod_usuario == $routeParams.usuarioId) {
                        $http.put('read/usuario/', $scope.usuario).success(function () {
                            var msg = "<strong>Editado</strong><br><p>O usuário " + $scope.usuario.nome + " foi editado com sucesso </p>";
                            mensagem(msg, "success", 5000)
                            $scope.formularioAddUsuario.$setPristine();
                        }).error(function (erro) {
                            $scope.mensagem = 'Não foi possivel alterar as inforamções do usuario!';
                            console.log(erro)
                        });
                    }
                }
            }
            else {
                var msg = "<strong>Aviso</strong><br><p>Nenhum campo foi alterado!!!</p>";
                mensagem(msg, "warning", 5000)
            }
        };
     }
    
    valida();
});