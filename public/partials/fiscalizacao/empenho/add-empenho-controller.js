angular.module('cidadesdigitais').controller('addEmpenhoController', function ($scope, $filter, $stateParams, InjecaoInfo, growl, $window) {

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
            permitido = InjecaoInfo.permissaoAcesso(15001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {

    if ($stateParams.empenhoId) {
        InjecaoInfo.getEmpenho()
            .success(function (empenho) {
                $scope.empenho = empenho;
            })
            .error(function (erro) {
                console.log(erro);
            });
    };

    InjecaoInfo.getNaturezaDespesa()
        .success(function (naturesaDespesa) {
            $scope.naturezaDespesas = naturesaDespesa
        })
        .error(function (error) {
            console.log(error);
        })


    InjecaoInfo.getPrevisaoEmpenho()
        .success(function (empenho) {
            $scope.previsaoEmpenho = empenho
        })
        .error(function (error) {
            console.log(error);
        })
    
      $scope.carregaPrevEmpenho = function(value){
             InjecaoInfo.getPrevEmpById(value)
        .success(function (dados) {
            $scope.prevEmpenho = dados
        
        })
        .error(function (error) {
            console.log(error);
        })
        };

    $scope.submitEmpenho = function (empenho) {
        
        $scope.empenhos = {
            cod_empenho: empenho.cod_empenho,
            previsao_empenho_cod_previsao_empenho: empenho.previsao_empenho_cod_previsao_empenho,
            data: $filter('date')(empenho.data, "yyyy-MM-dd")
        };
        
        console.log($scope.empenhos)
        
      
        InjecaoInfo.postEmpenho($scope.empenhos)
            .success(function () {
                delete $scope.empenho;
                delete $scope.prevEmpenho;
                var msg = "<strong>Cadastrado</strong><br><p>O empenho foi cadastrado com sucesso.</p>";
                mensagem(msg, "success",5000)
            })
            .error(function (erro) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao cadastrar o empenho. Por favor, tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });

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
