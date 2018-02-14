angular.module('cidadesdigitais').controller('visuNaturezaDespController', function ($scope, InjecaoInfo, growl, $window) {
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
            permitido = InjecaoInfo.permissaoAcesso(11001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    
     InjecaoInfo.getNaturezaDespesa()
        .success(function (naturezaDesp) {
            $scope.naturezaDesps = naturezaDesp;
         console.log( $scope.naturezaDesps)
        })
        .error(function (error) {
            console.log(error);
        })
    
    
   $scope.deleteNaturezaDes = function (naturezaDesp){
        
         InjecaoInfo.deleteNaturezaDespesa(naturezaDesp.cod_natureza_despesa)
          .success(function(naturezaDesp){
               console.log("deletado")
        
            })
            .error(function(error){
           
            
        });

        
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