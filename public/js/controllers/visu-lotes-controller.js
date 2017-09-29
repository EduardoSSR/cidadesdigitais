angular.module('cidadesdigitais').controller('visuLotesController', function ($scope, $http, $routeParams, growl) {
    
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    $scope.mensagem = function(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    
    
    /*============== Funcao para carregar todos os lotes do banco de dados =================*/
    $scope.carregarLote = function () {
        $http.get("/read/lotes")
            .success(function (lote) {
            $scope.lotes = lote;
        })
        .error(function(error){
            $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor tente novamente mais tarde.</p>";
            $scope.mensagem($scope.msg, "error", 10000);
        })
    };

    
    /*============== Funcao para excluir um lote do banco de dados =================*/
    $scope.deletar = function (lote) {
        $http.delete('read/lotes/' + lote.cod_lote)
        .success(function () {
            $scope.msg = "<strong>Excluído</strong><br><p>O lote " + lote.cod_lote + " foi excluido com sucesso.</p>";
            $scope.mensagem($scope.msg, "success", 5000);
             var indiceLote = $scope.lotes.indexOf(lote);
            $scope.lotes.splice(indiceLote, 1);
        }).error(function (error) {
            $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao excluir o lote " + lote.cod_lote + ". Verifique se existe dados que precisam ser apagados.</p>";
            $scope.mensagem($scope.msg, "error", 10000);
        });


    };


    /*============== Funcao para carregar os lotes do banco de dados na pagina =================*/
    $scope.carregarLote();

});