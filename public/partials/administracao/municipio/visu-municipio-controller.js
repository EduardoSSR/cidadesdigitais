angular.module('cidadesdigitais').controller('visuMunicipiosController', function($scope, $http, InjecaoInfo, growl, $window){
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem (msg, type, time) {
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
            permitido = InjecaoInfo.permissaoAcesso(24002, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    
    $scope.municipios = [];
    
    var carregarMunicipios = function (){
        $http.get("http://172.25.117.3:3000/read/municipios").success(function(data, status){
            $scope.municipios = data;
             $('#divLoading').hide();
        });
    };
    
    //    Metodo para retorna o array de estado armazenado no servidor
      $http.get('read/cd/estado')
        .success(function(estado){
           $scope.estados = estado;
         
        })
        .error(function(error){
            console.log(error);
        });
    
    
    carregarMunicipios();
    }
    else {
        var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
        mensagem(msg, "warning", 5000);
        $window.history.back();
    };
    }
    valida();
});