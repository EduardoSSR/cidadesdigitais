angular.module('cidadesdigitais').controller('CdProcessoController', function ($scope, $http, $routeParams, growl, InjecaoInfo) {
    

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    
        /*============== Funcao para enviar os dados do formulario para o banco =================*/
    $scope.carregarCodibge = $routeParams.cdCodIbge;
    
      /*============== Funcao que tras todos os processos do banco =================*/
  
        InjecaoInfo.getProcessos()
            .success(function (processo) {
                $scope.processos = processo;
            })
            .error(function (error) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar os dados do processo. Por favor, tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
               /* $scope.$apply(); */

            });
 
    
     $scope.getProcessoById = function(processo){
        InjecaoInfo.getProcessoById(processo.cod_processo, $routeParams.cdCodIbge)
        .success(function(processo){
            $scope.processoEdit = processo;
        })
        .error(function(){
            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar o processo desejado. Tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
        })
    }
    
     /*============ Função para cadastrar processo em cd ============*/
    $scope.processoEnv = function(processo) {
        $scope.processos = {
            cod_processo: processo.num_processos.replace(".","").replace("/","").replace("-",""),
            cd_municipio_cod_ibge: $routeParams.cdCodIbge,
            descricao: processo.descricao
        };
        InjecaoInfo.addProcesso($scope.processos)
            .success(function () {
                var msg = "<strong>Cadastrado</strong><br><p>O processo " + processo.num_processos + " foi cadastrado com successo.</p>"
                mensagem(msg, "success", 5000);
                $scope.$digest();

            })
            .error(function (error) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao cadastrar o processo " +  processo.num_processos + ". Por favor, tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
        });
         
    };

    
    
    /*============ Função para remover processo em cd ============*/
    $scope.removerProcesso = function (processo){
        InjecaoInfo.removerProcesso(processo.cod_processo, processo.cd_municipio_cod_ibge)
        .success(function (processo) {
            var msg = "<strong>Removido</strong><br><p>O processo " + processo.cod_processo  + " foi removido com successo.</p>";
            mensagem(msg, "success", 5000);
            $scope.getProcessos();
            })
        .error(function (error) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao remover o processo. Tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
    }
    
    
    /*============ Função para editar processo em cd ============*/
    $scope.editarProcesso = function (processo){
        $scope.editarProcesso={
            cod_processo: processo.cod_processo,
            cd_municipio_cod_ibge: $routeParams.cdCodIbge,
            descricao: processo.descricao
        };
        InjecaoInfo.editarProcesso($scope.editarProcesso)
            .success(function () {
                var msg = "<strong>Cadastrado</strong><br><p>O código " + processo.cod_processo + " foi editado com successo.</p>"
                mensagem(msg, "success", 5000);
                $scope.getProcessos();
            })
            .error(function (error) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao atualizar os dados do processo. Por favor, tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
    };
    

   

    
});