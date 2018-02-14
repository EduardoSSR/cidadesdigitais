angular.module('cidadesdigitais').controller('addNaturezaDespController', function ($scope, $http, InjecaoInfo, growl, $window) {
    
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
        $http.get('read/naturezaDespesa/')
        .success(function (naturezadesp) {
            $scope.naturezadesps = naturezadesp;
           
        })
        .error(function (erro) {});
   


    $scope.submitNaturezaDesp = function (naturezadesp) {
        if ($scope.formAddNaturezaDesp.$valid) {
            $scope.naturezadesp = naturezadesp;
            console.log($scope.naturezadesp)
            $http.post('read/naturezaDespesa', $scope.naturezadesp)
                .success(function () {
                  var msg = "<strong>Cadastrado</strong><br><p>A natureza de despesa <strong>" + $scope.naturezadesp.cod_natureza_despesa + "</strong> com sucesso.</p>";
                    mensagem(msg, "success", 5000);
                    
                })
                .error(function (erro) {
                var msg = "<strong>"+erro+"</strong><br><p></p>";
                    mensagem(msg, "error", 10000);
                   console.log(erro)
                });

          
        }
    };

    }
    else {
        var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
        mensagem(msg, "warning", 5000);
        $window.history.back();
    };
    }
    valida();
   
});
