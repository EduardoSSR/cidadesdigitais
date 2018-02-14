angular.module('cidadesdigitais').controller('visuEtapaController', function ($scope, InjecaoInfo, growl, $window) {
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
            permitido = InjecaoInfo.permissaoAcesso(22002, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    $scope.etapas = [
        {
            uf: 'Nilfgaard',
            mp: 'vila de ninguem',
            lt: '666',
            rl: 'Gerald',  
            tf: '66-6666-6666',      
           
        },
        {
            uf: 'gilfgaard',
            mp: 'tila de ninguem',
            lt: '966',
            rl: 'ferald',  
            tf: '86-6666-6666',      
              
        },
        {
            uf: 'qilfgaard',
            mp: 'wila de ninguem',
            lt: '866',
            rl: 'erald',  
            tf: '76-6666-6666',      
             
        },
        {
            uf: 'rilfgaard',
            mp: 'aila de ninguem',
            lt: '366',
            rl: 'terald',  
            tf: '46-6666-6666',      
              
        }
    ];
}
    else {
        var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
        mensagem(msg, "warning", 5000);
        $window.history.back();
    };
    }
    valida();
});