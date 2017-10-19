angular.module('cidadesdigitais').controller('visuCidadedigitaisController', function ($scope, growl, InjecaoInfo) {
    
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    $scope.mensagem = function(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }

    /*============== Funcao para trazer todas as cidades digitais cadastrados no banco de dados =================*/
    $scope.carregarCDs = function (){
    InjecaoInfo.getCds()
    .success(function(cidadeDigital){ 
        $scope.cidadesDigitais = cidadeDigital;
    })
    .error(function(error){
        $scope.msg = "<strong>" + error + "!</strong><p>Ocorreu um erro ao carregar os dados do servidor. Por favor tente novamente mais tarde.</p>";
        $scope.mensagem($scope.msg, "error", 10000);
    });
        };
    
    
    /*============== Funcao para deletar uma cidade digital que esta cadastrada no banco de dados =================*/
    $scope.deletarCd = function(codIbgeCd){
        
        
        
        InjecaoInfo.deleteCd(codIbgeCd.municipio_cod_ibge)
        .success(function(){
            $scope.carregarCDs();
            $scope.msg = "<strong>Excluido!</strong><p>A Cidade Digital foi excluída com sucesso.</p>";
            $scope.mensagem($scope.msg, "success", 5000);
        })
        .error(function(error){
            $scope.msg = "<strong>Atenção!</strong><p>A Cidade Digital não pode ser excluída. Verifique se existem informações associadas em processos, contatos ou pontos.<br><strong>Caso exista informações em acompanhamento ou fatura será impossível apagar a Cidade Digital.</strong></p>";
            $scope.mensagem($scope.msg, "error", 20000);
        });
    };
    
    /*============== Funcao para executar o metodo carregarCds() ao entrar na pagina =================*/
    $scope.carregarCDs();

});