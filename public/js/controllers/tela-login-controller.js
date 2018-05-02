angular.module('cidadesdigitais').controller('telaLoginController', function($scope, $http, $location, $cookieStore, growl){
    
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    
    var remember = false;
    $scope.user = {};
    if($cookieStore.get('cookie')) $scope.cookieVal = $cookieStore.get('cookie');
    
    if($scope.cookieVal) remember = true; 
    $scope.user = {
        login: $scope.cookieVal,
        senha: '',
        remember: remember
    };

    $scope.autenticar = function() {
        var usuario = $scope.user;
        if(usuario.remember == true){
            $cookieStore.put('cookie', usuario.login);
        }else{
            $cookieStore.remove('cookie');
        }
        
        $http.post('/usuario', {login: usuario.login, senha: usuario.senha})
        .success(function() {
            $location.path('/inicio');
        })
        .error(function(erro) {
            $scope.user = {};
            var msg = "<strong>Erro!</strong><br><p>Senha ou login incorretos.</p>";
            mensagem(msg, 'error', 10000);
        });
    };

    

    
});