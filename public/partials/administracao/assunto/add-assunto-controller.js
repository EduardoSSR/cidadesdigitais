angular.module('cidadesdigitais').controller('addAssuntoController', function ($scope, InjecaoInfo, growl, $window) {
    
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg, type, time) {
        growl.general(msg, {ttl: time}, type);
    }
    /* --INICIO-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    var permitido = true;

    function valida() {
    $scope.modulos = '';
    InjecaoInfo.getUsuarioModulos($window.sessionStorage.idUser)
        .success(function (modulo) {
            permitido = InjecaoInfo.permissaoAcesso(19001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    function carregaController() {
        if (permitido) {
	$scope.submitAssunto = function () {
		if ($scope.formAddAssunto.$valid) {
            InjecaoInfo.postAssuntos($scope.assunto)
				.success(function () {
					delete $scope.assunto;
					$scope.formAddAssunto.$setPristine();
					var msg = "<strong>Cadastrado</strong><br><p>O assunto foi cadastrado com sucesso.</p>";
                    mensagem(msg, "success", 5000);
				})
				.error(function (erro) {
					var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao cadastrar o assunto. Por favor tente novamente mais tarde.</p>";
                    mensagem(msg, "error", 10000);
				});

			//        javascript:location.href="cid/assunto";
		}
	};
        }
        else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        }
    }
    valida();
});
