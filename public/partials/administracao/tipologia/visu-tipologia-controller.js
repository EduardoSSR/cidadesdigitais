angular.module('cidadesdigitais').controller('visuTipologiaController', function ($scope, InjecaoInfo, growl, $window) {
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
            permitido = InjecaoInfo.permissaoAcesso(27002, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    
    function getTipo(){
         InjecaoInfo.getTipologia()
        .success(function (tipologia) {
            $scope.tipologias = tipologia
                 /* var msg = "<strong>Cadastrado</strong><br><p>A natureza de despesa <strong>" + $scope.naturezadesp.cod_natureza_despesa + "</strong> com sucesso.</p>";
                    mensagem(msg, "success", 5000);*/
                })
                .error(function (erro) {
              /*  var msg = "<strong>"+erro+"</strong><br><p></p>";
                    mensagem(msg, "error", 10000);*/
                   console.log(erro)
                });
    }
   
    
    
    
    $scope.deleteTipologia = function(tipologia){
        InjecaoInfo.deleteTipologiaId(tipologia.cod_tipologia)
        .success(function () {
            getTipo();
                 /* var msg = "<strong>Cadastrado</strong><br><p>A natureza de despesa <strong>" + $scope.naturezadesp.cod_natureza_despesa + "</strong> com sucesso.</p>";
                    mensagem(msg, "success", 5000);*/
                })
                .error(function (erro) {
              /*  var msg = "<strong>"+erro+"</strong><br><p></p>";
                    mensagem(msg, "error", 10000);*/
                   console.log(erro)
                });
    } 
    
    getTipo();
    }
    else {
        var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
        mensagem(msg, "warning", 5000);
        $window.history.back();
    };
    }
    valida();
});