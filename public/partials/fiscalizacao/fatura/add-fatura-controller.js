angular.module('cidadesdigitais').controller('addFaturaController', function ($scope, $filter, $location, InjecaoInfo, growl, $window) {
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
            permitido = InjecaoInfo.permissaoAcesso(17001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    $scope.addDadosFatura = [];
   

    InjecaoInfo.getCds()
        .success(function (dados){
            $scope.codsIbge = dados;
    }).error(function (erro){
        console.log(erro);
    });

    $scope.inserirFatura = function (fatura) {
        if ($scope.formFatura.$valid) {
            $scope.faturas = {
                num_nf: $scope.fatura.num_nf,
                cd_municipio_cod_ibge : $scope.fatura.municipio_cod_ibge,
                dt_nf: $filter('date')($scope.fatura.dt_nf,"yyyy-MM-dd")
            }
   
            InjecaoInfo.postFatura($scope.faturas)
                .success(function () {
                    var msg = "<strong>Fatura Cadastrada</strong><br><p>A fatura <strong>"+ fatura.num_nf  +"</strong> foi cadastrada com sucesso.</p>";
                    mensagem(msg, "success", 5000);
                    delete $scope.fatura;
                    $scope.formFatura.$setPristine();
                    $location.path(/editFatura/ + fatura.num_nf)
                })
                .error(function (erro) {
                    console.log(erro);
                     var msg = "<strong>"+ erro +"</strong><br><p>A fatura <strong>"+ fatura.num_nf  +"</strong> não foi cadastrada.</p>";
                    mensagem(msg, "error", 5000);
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
