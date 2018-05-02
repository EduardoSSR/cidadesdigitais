angular.module('cidadesdigitais').controller('addEntidadeController', function ($scope, $http, growl, InjecaoInfo, $location, $filter, $window) {

    function mensagem(msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    };
    /* --INICIO-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    var permitido = true;

    function valida() {
    $scope.modulos = '';
    InjecaoInfo.getUsuarioModulos($window.sessionStorage.idUser)
        .success(function (modulo) {
            permitido = InjecaoInfo.permissaoAcesso(12001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    $("#cep").mask("99.999-999");
    $("#cnpj").mask("99.999.999/9999-99");

    /*  $scope.ourPostalCode  =  false ;

    	Correios.get('02011200').then(function(data) {
    		 $scope.ourPostalCode  =  data.cep ;
    	});*/

        
        
        $scope.buscacep = function (entidade) {
            $scope.ceps = $scope.entidade.cep.toString().replace(".", "").replace("-", "");
            var cepvalue = $scope.ceps;
            console.log(cepvalue)
            
         /*$http.get('https://viacep.com.br/ws/' + cepvalue + '/json/').then(function (response) {
    		  $scope.myData = response.data;
    		  }, function(response) {
    				//Second function handles error
    				alert("Something went wrong");
    		});
            
            $http.get('https://viacep.com.br/ws/' + cepvalue + '/json/')
                .success(function (dadoscep) {
                
                    $scope.entidade = dadoscep;
                console.log(dadoscep)
                    alert("Qual o problema ?");
                });*/
        }
        
         $http.get('read/cd/estado')
            .success(function(estado){
               $scope.estados = estado;

            })
            .error(function(error){
                console.log(error);
        });
    
          $scope.enviarEstado = function(uf){
            $http.get('read/cd/municipio/' + uf)
            .success(function(municipio){
               $scope.municipios = municipio;
            })
            .error(function(error){
                console.log(error);
            });
        }
          

    /*== Função para submeter os dados do HTML ===*/

    $scope.submeter = function (entidade) {
        console.log(entidade)
        $scope.entidades = {
            cnpj: $scope.entidade.cnpj.toString().replace(".", "").replace(".", "").replace("/", "").replace("-", ""),
            nome: $scope.entidade.nome,
            endereco: $scope.entidade.endereco,
            numero: $scope.entidade.numero,
            bairro: $scope.entidade.bairro,
            cep: $scope.entidade.cep.replace(".","").replace("-",""),
            nome_municipio: $scope.entidade.nome_municipio,
            uf: $scope.entidade.uf,
            observacao: $scope.entidade.observacao
        }
        InjecaoInfo.postEntidade($scope.entidades)
            .success(function () {
                var msg = "<strong>Cadastrado!</strong><br>" + $scope.entidade.nome + " foi cadastrado(a) com sucesso.";
                mensagem(msg, "success", 5000);
                console.log($scope.entidades);
                $location.path('/editEntidades/' + $scope.entidades.cnpj);
            })
            .error(function (erro) {
                var msg = "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao cadastrar o(a) </p>" + $scope.entidade.nome + ", tente novamente mais tarde.";
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