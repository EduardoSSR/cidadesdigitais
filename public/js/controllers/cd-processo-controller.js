angular.module('cidadesdigitais').controller('CdProcessoController', function ($scope, $http, $routeParams, growl, InjecaoInfo) {
    

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    $scope.mensagem = function(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    
/*============ Função para adicionar processo em cd ============*/

    $scope.submeterProcesso = function (processo) {
        InjecaoInfo.submeterProcesso(processo)
            .success(function () {
                $scope.msg = "<strong>Cadastrado</strong><br><p>O código " + cod_processo + " foi cadastrado com successo.</p>"
                $scope.mensagem($scope.msg, "success", 5000);
                $scope.getProcessos();
            })
            .error(function (error) {
                $scope.msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao enviar o processo. Tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };

    /*============== Funcao para enviar os dados do formulario para o banco =================*/
    $scope.carregarCodibge = $routeParams.cdCodIbge;
    
     $scope.carregarProcesso = function () {
    $http.get('read/processo/')
        .success(function (processo) {
            $scope.processos = processo;
        })
        .error(function (erro) {
            console.log(erro)
        });
     };
      /*============ Função para remover processo em cd ============*/
    
    $scope.removerProcesso = function (processo){
        
       $http.delete('/read/processo/' + processo.cod_processo  + '/' + processo.cd_municipio_cod_ibge)
        .success(function (processo) {
                      
                var indiceProcesso = $scope.processos.indexOf(processo);
                console.log($scope.processos.splice(indiceProcesso, 1));
                
           
           $scope.msg = "<strong>Removido</strong><br><p>" + processo.cod_processo  + " foi removido com successo.</p>";
         $scope.mensagem($scope.msg, "success", 5000);

           
           
//           window.location.href = "cid/editCD/" + $routeParams.cdCodIbge + "#8a" ;
           
            })
        .error(function (error) {
            });
       
        
    }
     $scope.carregarProcesso();
    
    
    
        /*============== Funcao que tras todos os processos do banco =================*/
    $scope.getProcessos = function () {
        InjecaoInfo.getProcessos()
            .success(function (processo) {
                $scope.processos = processo;
            })
            .error(function (error) {

            });
    };
    
    
    

    $scope.processoEnv = function (processo) {
        $scope.processos = {
            cod_processo: processo.num_processos,
            cd_municipio_cod_ibge: $routeParams.cdCodIbge,
            descricao: processo.descricao
        };


        InjecaoInfo.addProcesso($scope.processos)
            .success(function () {
                $scope.getProcessos();
                $scope.msg = "<strong>Cadastrado</strong><br><p>O processo " + processo.num_processos + " foi cadastrado com successo.</p>"
                $scope.mensagem($scope.msg, "success", 5000);
                delete $scope.processos;

            })
            .error(function (error) {});
    };

    
});