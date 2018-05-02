angular.module('cidadesdigitais').controller('addPrevEmpController', function ($scope, $http, $filter, $routeParams, $location, InjecaoInfo, growl, $window) {

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
            permitido = InjecaoInfo.permissaoAcesso(18001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    
    $scope.tipos = [{
        name: "Reajuste",
        value: "R"
    }, {
        name: "Original",
        value: "O"
    }];
    

    InjecaoInfo.getLotes()
        .success(function (lote) {
            $scope.lotes = lote;
        })
        .error(function (error) {
            var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor, tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
        })

    
    InjecaoInfo.getNaturezaDespesa()
        .success(function (naturezaDespesa) {
            $scope.naturezaDespesas = naturezaDespesa
        })
        .error(function (error) {
            var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar as naturezas de despesa do banco de dados. Por favor, tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000)
        })



    $scope.submeter = function () {
        $scope.prevEmpenho = {
            lote_cod_lote: $scope.prevEmp.cod_lote,
            data: $filter('date')($scope.prevEmp.data, "yyyy-MM-dd"),
            tipo: $scope.prevEmp.tipo,
            ano_referencia: $scope.prevEmp.ano_referencia,
            natureza_despesa_cod_natureza_despesa: $scope.prevEmp.natDesp
 };
       
        
        
        
        
        InjecaoInfo.postPrevEmpenho($scope.prevEmpenho)
            .success(function (idPrevisaoEmpenho) {
                delete $scope.prevEmp;
                $scope.prevempForm.$setPristine();
                var msg = "<strong>Cadastrado</strong><br><p>A previsão de emprenho foi cadastrada com sucesso.</p>";
                mensagem(msg, "success", 5000);
                $location.path("/editPrevisaoEmpenho/" + idPrevisaoEmpenho);
               
                })
            .error(function (error) {
               var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao cadastrar a previsão de empenho. Por favor, tente novamente mais tarde.</p>";
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