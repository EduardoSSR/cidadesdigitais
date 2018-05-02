angular.module('cidadesdigitais').controller('addEditCdController', function ($scope, growl, InjecaoInfo, $location, $filter, $window, cadastroDeEntidade, recursoCD, $stateParams) {

    function mensagem(msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    };

    
      
    
});