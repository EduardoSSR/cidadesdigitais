angular.module('cidadesdigitais').controller('inicioController', function($scope, growl, $window, $location, InjecaoInfo){
    
    var token = $window.sessionStorage.token;
    var codUser = $window.sessionStorage.idUser;
    
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    
    /*============== Funcao para carregar as informacoes do usuario que esta logado =================*/
    function carregaUser(){
        InjecaoInfo.getUserById(codUser)
        .success(function(user){
            $scope.usuario = user;
        })
        .error(function(error){
            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar os dados do usuário. Por favor, tente novamente mais tarde.";
            mensagem(msg, "error", 10000);
            $scope.logout();
        });
    };
    
    /*============== Funcao para fazer logout da conta do usuario =================*/
    $scope.logout = function(){
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.idUser;
        delete $window.sessionStorage.modulos;
        $location.path("/telalogin");
    }
    
    /*============== Funcao para entrar na pagina de editar perfil do usuario =================*/
    $scope.editPerfil = function(){
        $location.path("/editUsuario/" + codUser);
    }
    
    /*============== Chamado da funcao carregaUser() =================*/
    carregaUser();
})