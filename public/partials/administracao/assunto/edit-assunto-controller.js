angular.module('cidadesdigitais').controller('editAssuntoController', function ($scope, $stateParams, growl, InjecaoInfo, $location, $window) {
    
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
            permitido = InjecaoInfo.permissaoAcesso(19003, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    function carregaController() {
        if (permitido) {
    var idAssunto = $stateParams.idAssunto;
    
    function getAssunto(){
        InjecaoInfo.getAssuntoById(idAssunto)
        .success(function(assuntos){
            $scope.assunto = assuntos;
        })
        .error(function(error){
            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar as informações do assunto. Por favor tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
            $location.path('/assunto')
        });
    };
    
    $scope.editAssunto = function(){
        InjecaoInfo.putAssuntoById(idAssunto, {descricao: $scope.assunto.descricao})
        .success(function(){
            var msg = "<strong>Editado</strong><br><p>O assunto foi editado com sucesso.</p>";
            mensagem(msg, "success", 5000);
            getAssunto();
        })
        .error(function(error){
            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao editar o assunto. Por favor tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
            $location.path('/assunto')
        })
    };
    
    getAssunto();
    }
        else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        }
    }
    valida();
});