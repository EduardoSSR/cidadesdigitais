angular.module('cidadesdigitais').controller('addPagamentoController', function ($scope, $http, $filter, InjecaoInfo, growl, $window) {
    
    
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
            permitido = InjecaoInfo.permissaoAcesso(16001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    
    InjecaoInfo.getCds()
        .success(function (dados){
            $scope.codsIbge = dados;
    }).error(function (error){
        var msg = "<strong>Error!</strong><br><p>Ocorreu um erro ao carregar as cidades digitais do banco de dados. Por favor tente novamente mais tarde.</p>";
        mensagem(msg, "error", 10000);
    });
    
    $scope.selectFaturas = function(codIbge) {
        InjecaoInfo.getFaturaByCodIbge(codIbge)
        .success(function(fatura){
            $scope.faturas = fatura;
        })
        .error(function(error){
            var msg = "<strong>Error!</strong><br><p>Ocorreu um erro ao carregar as faturas do banco de dados. Por favor tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
        })
    };
    
    $scope.selecionarFaturas = function(fatura) {
        var existe = false;
        if(fatura){
            if($scope.faturasSelecionadas){
                for(var c = 0; c < $scope.faturasSelecionadas.length; c++){
                    if(fatura.num_nf == $scope.faturasSelecionadas[c].num_nf){
                        existe = true;
                        break;
                    }
                }
                if(existe == false){
                    $scope.faturasSelecionadas[$scope.faturasSelecionadas.length] = fatura;
                }
            }else{
                $scope.faturasSelecionadas = [fatura];
            }
        }
    };
    
    $scope.excluirFaturasSelecionadas = function(faturaSelecionada) {
        var indicePonto = $scope.faturasSelecionadas.indexOf(faturaSelecionada);
        $scope.faturasSelecionadas.splice(indicePonto, 1);
        if($scope.faturasSelecionadas == ""){
            $scope.pagamento.faturas = "";
        }
    }

    $scope.submeter = function () {
        if ($scope.pagamentoForm.$valid) {
            var faturasSelec = [];
            for(var v = 0; v < $scope.faturasSelecionadas.length; v++){
                   faturasSelec[v] = {fatura_num_nf: $scope.faturasSelecionadas[v].num_nf, fatura_cd_municipio_cod_ibge: $scope.faturasSelecionadas[v].cd_municipio_cod_ibge};
            }
            
            $scope.pagamentos = {
                cod_otb: $scope.pagamento.cod_otb,
                dt_pgto: $filter('date')($scope.pagamento.dt_pgto,'y-MM-dd'),
                faturas: faturasSelec
            };
            
            InjecaoInfo.postPagamento($scope.pagamentos)
                .success(function () {
                    delete $scope.pagamento;
                    delete $scope.faturasSelecionadas;
                    var msg = "<strong>Cadastrado</strong><br><p>Pagamento cadastrado com sucesso.</p>";
                    mensagem(msg, "success", 5000);
                })
                .error(function (error) {
                    var msg = "<strong>Error!</strong><br><p>Ocorreu um erro ao cadastrar o pagamento. Por favor, tente novamente mais tarde.</p>";
                    mensagem(msg, "error", 10000);
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
