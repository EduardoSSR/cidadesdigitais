angular.module('cidadesdigitais').controller('CdUacomController', function ($scope, $routeParams, growl, InjecaoInfo) {
    
    $scope.acompanhamentos = [];

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    
/*====== Funcao para pegar todos os assuntos do banco ========*/
    function getAssuntos(){
        InjecaoInfo.getAssuntos()
        .success(function(assunto){
            $scope.assuntos = assunto;
        })
        .error(function(error){
            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro carregar os assuntos. Tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
        });
    }
    
    /*============== Funcao que carrega o acompanhamento do banco =================*/
    function getAcompanhamentos(){
        
        InjecaoInfo.getAcompanhamentos()
        .success(function(uacom){
            $scope.acompanhamentos = InjecaoInfo.getEditUacom(uacom);
        })
        .error(function(error){
             var msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro carregar os acompanhamentos. Tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
        });
    };
    
    /*============== Funcao que carrega o acompanhamento do banco apartir do id passado =================*/
    $scope.getAcompanhamentosById = function(uacom){
        var dateUacom = new Date(uacom.data);
        var data = dateUacom.toISOString().slice(0, 10) + dateUacom.toLocaleString().slice(10, 19);
        InjecaoInfo.getAcompanhamentosById(uacom.cd_municipio_cod_ibge, data)
        .success(function(uacomById){
            $scope.uacomById = InjecaoInfo.getEditUacom(uacomById)[0];
            $scope.novosAssuntos = [];
            $('#janela99').modal('show');
        })
        .error(function(error){
            var msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro carregar os acompanhamentos. Tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
        });
    };
    
    /*====== Funcao para adicionar um elemento não repetido dentro do array de assuntos no modal de editar acompanhamentos ========*/
    $scope.armEditAssunto = function (assuntoCd) {
        var repetido = false;
        for(var w = 0; w < $scope.uacomById.assuntos.length; w++){
                if($scope.uacomById.assuntos[w].cod_assunto == assuntoCd.cod_assunto){
                    repetido = true;
                    break;
                }
            }
            if(repetido == false){
                if ($scope.novosAssuntos != null) {
                    var existe = false;
                    for (var i = 0; i < $scope.novosAssuntos.length; i++) {
                        if ($scope.novosAssuntos[i].cod_assunto == assuntoCd.cod_assunto){
                            existe = true;
                            break;
                        } /*fim do if de comparaçao do array*/
                    } /*fim do for*/
                    if (existe != true) {
                        $scope.novosAssuntos[$scope.novosAssuntos.length] = assuntoCd;
                    } /*fim do if de verificação se existe é true*/
                } else {
                    $scope.novosAssuntos = [assuntoCd];
                } /*fim do else*/
            }else{
                 var msg = "<strong>Aviso!</strong><br><p>Este assunto já está cadastrado no banco.</p>";
                mensagem(msg, "warning", 10000);
            }
    };
    
    /*============== Funcao para remover o elemento selecionado assunto da tela no modal de editar acompanhamentos =================*/
    $scope.removerEditUacom = function (assuntoSelecionados) {
        var indicePonto = $scope.novosAssuntos.indexOf(assuntoSelecionados);
        $scope.novosAssuntos.splice(indicePonto, 1);
    };
    
    
    /*============== Funcao para adicionar novos assuntos ao array que sera enviado para o banco no modal de editar acompanhamentos =================*/
    $scope.enviarEditAssunto = function(novosAssuntos){
        $scope.novosAssuntEdit = [];
        for(var j = 0; j < novosAssuntos.length; j++){
            $scope.novosAssuntEdit[j] = {
                uacom_cd_municipio_cod_ibge: $scope.uacomById.cd_municipio_cod_ibge,
                uacom_data: new Date($scope.uacomById.data).toISOString().slice(0, 10) + new Date($scope.uacomById.data).toLocaleString().slice(10, 19),
                assunto_cod_assunto: novosAssuntos[j].cod_assunto
            }
        }
        InjecaoInfo.postUacomAssunto($scope.novosAssuntEdit)
        .success(function(){
            $('#janela99').modal('hide');
            var msg = "<strong>Cadastrado</strong><br><p>Os novos assuntos foram inseridos com sucesso em " + $scope.uacomById.titulo + ".</p>";
            mensagem(msg, "success", 5000);
            
        })
        .error(function(error){
            var msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao inserir os novos assuntos. Por favor, tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
        })
    }
        
    
    /*============== Funcao para filtrar os acompanhamentos de acordo com o assunto na pagina de acompanhamento dentro de cidade digital =================*/
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

    
/*====== Funcao para adicionar um elemento não repetido dentro do array de assuntos no modal de adicionar acompanhamentos ========*/
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


    /*============== Funcao para Remove o elemento selecionado assunto da tela no modal de adicionar acompanhamentos =================*/
    $scope.removerAddUacom = function (assuntoSelecionados) {
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
            data: date.toISOString().slice(0, 10) + date.toLocaleString().slice(10, 19),
            titulo: $scope.assuntosCd.titulo,
            relato: $scope.assuntosCd.relato,
            uacom_cod: armAssunto
        };
                
        InjecaoInfo.postAssunto($scope.assuntoCd)
            .success(function () {
                $('#janela10').modal('hide');
                getAcompanhamentos();
                var msg = "<strong>Cadastrado</strong><br><p>O acompanhamento foi enviado com sucesso.</p>";
                mensagem(msg, "success", 5000);
                delete $scope.assuntosCd
                delete $scope.assuntosSelecionados
            })
            .error(function (erro) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro registrar o acompanhamento no banco de dados. Por favor tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
        };

    getAssuntos();
    getAcompanhamentos();
    
});