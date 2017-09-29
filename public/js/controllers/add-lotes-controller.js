angular.module('cidadesdigitais').controller('addLotesController', function ($scope, $http, $filter, growl) {
    
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    $scope.mensagem = function(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    
    /*============== Funcao para cadastrar os lotes no banco de dados =================*/
    $scope.submitLotes = function () {
        
        $scope.lote = { 
            cod_lote: $scope.lotes.codLote,
            entidade_cnpj: $scope.lotes.entidadeCnpj,
            contrato: $scope.lotes.contrato,
            dt_inicio_vig: $filter('date')($scope.lotes.dtInicioVig,"yyyy-MM-dd"),
            dt_final_vig: $filter('date')($scope.lotes.dtFinalVig,"yyyy-MM-dd"),
            dt_reajuste:  $filter('date')($scope.lotes.dtReajuste,"yyyy-MM-dd")
        };
            $http.post('read/lotes', $scope.lote)
                .success(function () {
                $scope.msg = "<strong>Cadastrado</strong><p>O lote " + $scope.lote.cod_lote + " foi cadastrado com sucesso.</p>";
                $scope.mensagem($scope.msg, "success", 5000);
                delete $scope.lotes;
                $scope.formularioAddLotes.$setPristine();
                })
                .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><p>Verifique se o número do lote já existe.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };


});










 