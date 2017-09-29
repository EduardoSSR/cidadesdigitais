angular.module('cidadesdigitais').controller('addUsuarioController', function ($scope, $http, $resource, growl) {

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    $scope.mensagem = function(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
     /*============== Funcao para pegar os dados de perfil do banco =================*/    
     $http.get('read/perfil/')
        .success(function(usuario){
            $scope.usuario = usuario;
        })
        .error(function(erro){
            $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os dados do perfil. Por favor tente novamente mais tarde.</p>";
                    $scope.mensagem($scope.msg, "error", 10000);
        });
    
    /*============== Funcao para adicionar usuarios no banco de dados =================*/
    $scope.submeter = function () {
        if ($scope.formularioAddUsuario.$valid) {
            
            $scope.usuarios = {
                perfil_cod_perfil: $scope.usuario.perfil,
                nome: $scope.usuario.nome,
                login: $scope.usuario.login,
                senha: $scope.usuario.senha,
                email: $scope.usuario.email,
                telefone: $scope.usuario.telefone
            }
            $http.post('read/usuario', $scope.usuarios)
                .success(function () {
                    $scope.msg = "<strong>Cadastrado</strong><br><p> O usuário " + $scope.usuarios.nome + " foi cadastrado com successo.</p>";
                    $scope.mensagem($scope.msg, "success", 5000);
                    delete $scope.usuario;
                    $scope.formularioAddUsuario.$setPristine();
            })
                .error(function (error) {
                    $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao cadastrar o usuário " + $scope.usuario.nome + ". Por favor tente novamente mais tarde.</p>";
                    $scope.mensagem($scope.msg, "error", 10000);
                });
        
        }
    };


});