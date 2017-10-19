angular.module('cidadesdigitais').controller('CdUacomController', function ($scope, $http, $routeParams, growl, InjecaoInfo) {
    
    $scope.acompanhamentos = [];

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    $scope.mensagem = function(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    
/*====== Funcao para pegar todos os assuntos do banco ========*/
    $scope.getAssuntos = function(){
        InjecaoInfo.getAssuntos()
        .success(function(assunto){
            $scope.assuntos = assunto;
        })
        .error(function(error){
            $scope.msg = "<strong>Erro!</strong><br><p>Ocorreu um erro carregar os assuntos. Tente novamente mais tarde.</p>";
            $scope.mensagem($scope.msg, "error", 10000);
        });
    }
    
    
    /*============== Funcao que carrega o acompanhamento do banco =================*/
    $scope.getAcompanhamentos = function(){
        InjecaoInfo.getAcompanhamentos()
        .success(function(uacom){
            
            var acompanhamento = [];
            
            for(var z = 0; z < uacom.length; z++){
                
                acompanhamento[z] = {
                    cd_municipio_cod_ibge: uacom[z].cd_municipio_cod_ibge,
                    titulo: uacom[z].titulo,
                    relato: uacom[z].relato,
                    data: uacom[z].data,
                    assuntos: [{
                        cod_assunto: uacom[z].cod_assunto,
                        descricao: uacom[z].descricao
                    }]

                }
            };
            
           $scope.acompanhamentoCd = [acompanhamento[0]];
            
            for(var x = 0; x < acompanhamento.length - 1; x++){
                
                if(acompanhamento[x+1].cd_municipio_cod_ibge == $scope.acompanhamentoCd[$scope.acompanhamentoCd.length - 1].cd_municipio_cod_ibge && acompanhamento[x+1].data == $scope.acompanhamentoCd[$scope.acompanhamentoCd.length - 1].data){
                    
                    $scope.acompanhamentoCd[$scope.acompanhamentoCd.length-1].assuntos[$scope.acompanhamentoCd[$scope.acompanhamentoCd.length-1].assuntos.length] = acompanhamento[x+1].assuntos[acompanhamento[x+1].assuntos.length-1];
                    
                }else{
                    
                    $scope.acompanhamentoCd[$scope.acompanhamentoCd.length] = acompanhamento[x+1];

                }
            }
            
            $scope.acompanhamentos = $scope.acompanhamentoCd;
        })
        .error(function(error){
             $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro carregar os acompanhamentos. Tente novamente mais tarde.</p>";
            $scope.mensagem($scope.msg, "error", 10000);
        });
    };
    
     $scope.filterAssunto = function(acompanhamento){
         var status = true;
         if($scope.busca != undefined){
         for(var s = 0; s < acompanhamento.assuntos.length; s++){
             if(acompanhamento.assuntos[s].cod_assunto == $scope.busca){
                status = true;
                break;
             }else{
                status = false;
             }     
         }
         return status;
         }else{
             return status;
         }
        };

/*====== Funcao para adicionar um elemento não repetido dentro do array de assuntos ========*/
    $scope.armTempAssunto = function (assuntoCd) {
        if ($scope.assuntosSelecionados != null) {
            var existe = false;
            for (var i = 0; i < $scope.assuntosSelecionados.length; i++) {
                if ($scope.assuntosSelecionados[i].cod_assunto == assuntoCd.descricao.cod_assunto) {
                    existe = true;
                    break;
                } /*fim do if de comparaçao do array*/
            } /*fim do for*/
            if (existe != true) {
                $scope.assuntosSelecionados[$scope.assuntosSelecionados.length] = assuntoCd.descricao;
            } /*fim do if de verificação se existe é true*/
        } else {
            $scope.assuntosSelecionados = [assuntoCd.descricao];
        } /*fim do else*/
    };


    /*============== Funcao para Remove o elemento selecionado assunto da tela =================*/
    $scope.remover = function (assuntoSelecionados) {
        var indicePonto = $scope.assuntosSelecionados.indexOf(assuntoSelecionados);
        $scope.assuntosSelecionados.splice(indicePonto, 1);
    };
    
    /*============== Funcao para enviar os dados de assunto CD para o banco =================*/
    $scope.enviarAssunto = function () {
        var armAssunto = [];
        for (var r = 0; r < $scope.assuntosSelecionados.length; r++) {
            armAssunto[r] = $scope.assuntosSelecionados[r].cod_assunto;
        };
        
        var date = new Date();
        
        $scope.assuntoCd = {
            cd_municipio_cod_ibge: $routeParams.cdCodIbge,
            data: date.toISOString().slice(0, 10).replace('T', ' ') + date.toLocaleString().slice(10, 19).replace('T', ' '),
            titulo: $scope.assuntosCd.titulo,
            relato: $scope.assuntosCd.relato,
            uacom_cod: armAssunto
        };
                
        InjecaoInfo.postAssunto($scope.assuntoCd)
            .success(function () {
                $scope.getAcompanhamentos();
                console.log($scope.acompanhamentos);
                $scope.msg = "<strong>Cadastrado</strong><br><p>O acompanhamento foi enviado com sucesso.</p>";
                $scope.mensagem($scope.msg, "success", 5000);
            })
            .error(function (erro) {
                $scope.msg = "<strong>Erro!</strong><br><p>Ocorreu um erro registrar o acompanhamento no banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
        };

    $scope.getAssuntos();
    $scope.getAcompanhamentos();
    
});