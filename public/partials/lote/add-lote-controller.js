angular.module('cidadesdigitais').controller('addLotesController', function ($scope, $http, $filter, $location, InjecaoInfo, growl, $window, recursoLote, recursoEntidade, $stateParams) {

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg, type, time) {
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
                permitido = InjecaoInfo.permissaoAcesso(14001, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */

    function carregaController() {
        if (permitido) {

        /*================Pega Dados do serviço InjeçãoInfo ================*/
            recursoEntidade.query(function (entidade) {
                $scope.entidades = entidade;
            }, function (erro) {
                console.log(erro);
            });



            /*================Pega Dados do serviço InjeçãoInfo ================*/
            if ($stateParams.loteId) {
                recursoLote.get({
                    loteId: $stateParams.loteId
                }, function (lote) {
                    $scope.lotes = lote;
                }, function (erro) {
                    $scope.mensagem = 'Não foi possível obter a lote'
                });
            }





            /*============== Funcao para cadastrar os lotes no banco de dados =================*/
            $scope.submitLotes = function () {

                $scope.lote = {
                    cod_lote: $scope.lotes.codLote,
                    entidade_cnpj: $scope.lotes.entidadeCnpj,
                    contrato: $scope.lotes.contrato,
                    dt_inicio_vig: $filter('date')($scope.lotes.dtInicioVig, "yyyy-MM-dd"),
                    dt_final_vig: $filter('date')($scope.lotes.dtFinalVig, "yyyy-MM-dd"),
                    dt_reajuste: $filter('date')($scope.lotes.dtReajuste, "yyyy-MM-dd")
                };

                $http.post('read/lotes', $scope.lote)
                    .success(function () {
                        var msg = "<strong>Cadastrado</strong><p>O lote " + $scope.lote.cod_lote + " foi cadastrado com sucesso.</p>";
                        mensagem(msg, "success", 5000);
                        delete $scope.lotes;
                        $scope.formularioAddLotes.$setPristine();
                        $location.path('/editLote/' + $scope.lote.cod_lote)
                    })
                    .error(function (error) {
                        var msg = "<strong>" + error + "</strong><p>Verifique se o número do lote já existe.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };
        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();

});