angular.module('cidadesdigitais').controller('addCDController', function ($scope, $http, $location, InjecaoInfo, growl, $window) {   
    
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
            permitido = InjecaoInfo.permissaoAcesso(13001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {

//    Metodo para retorna os dados da tupla de lote
       $http.get('read/lotes/')
        .success(function(loteCd){
           $scope.loteCds = loteCd;
         
        })
        .error(function(error){
            console.log(error);
        });
    
//    Metodo para retorna o array de estado armazenado no servidor
      $http.get('read/cd/estado')
        .success(function(estado){
           $scope.estados = estado;
         
        })
        .error(function(error){
            console.log(error);
        });
    
//    Metodo para retornar os municipios relacionados com os estados enviados.    
       $scope.vemMunicipio = function(uf){
        $http.get('read/cd/municipio/' + uf)
        .success(function(municipio){
           $scope.municipios = municipio;
        })
        .error(function(error){
            console.log(error);
        });
        }
    
//Metodo para enviar o UF(estado) para o servidor
    $scope.enviarEstado = function(cidadeDigitais){
        $scope.unidadeFederal = cidadeDigitais;
       $http.post('/read/cd/municipio')
        .success(function(cidadeDigital){
        $scope.vemMunicipio($scope.unidadeFederal.uf);
         
        })
        .error(function(error){
            console.log(error);
        });
    }

//    Metodo para enviar as informações da pagina para o servidor, logo para o banco
    $scope.submitCd = function (digitalCidade) {
		if ($scope.formAddCD.$valid) {
            $scope.digitalCidade = digitalCidade;
            
            cadastroCD.cadastrar($scope.entidade = entidade)
                    .then(function (dados) {
                        mensagem(dados.mensagem, "success", 5000);
                        if (dados.inclusao) {
                            /*$scope.entidade = {};*/
                            $location.path('/editEntidades/' + $scope.entidade.cnpj);
                        }

                    })
                    .catch(function (erro) {
                        $scope.mensagem = erro.mensagem;
                    });

			// $http.post('read/cd', $scope.digitalCidade)
			// 	.success(function () {
			// 		$scope.formAddCD.$setPristine();        
			// 		var msg = "<strong>Cadastrado</strong><br><p>Cidade digital cadastrada com successo.</p>";
			// 		mensagem(msg, 'success', 5000);
            //       $location.path('/editCD/' + digitalCidade.municipio_cod_ibge)
			// 	})
			// 	.error(function (error) {    
			// 	console.log(error)
			// 		var msg = "<strong>" + error.msg + "</strong><br><p>Ocorreu um erro ao cadastrar a cidade digital. Por favor tente novamente mais tarde.</p>";
			// 		mensagem(msg, 'error', 10000);
			// 	});   
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
