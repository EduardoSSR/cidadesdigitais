angular.module('cidadesdigitais').controller('visuAssuntoController', function ($scope, InjecaoInfo, growl, $location, $window) {

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
            permitido = InjecaoInfo.permissaoAcesso(19002, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    function carregaController() {
        if (permitido) {
    function getAssuntos(){
        InjecaoInfo.getAssuntos()
            .success(function (assunto) {
            $scope.assuntos = assunto;
            }).error(function (error) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar os assuntos. Por favor tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
                $location.path('/administracao')
            });
        }
    
    $scope.deleteAssunto = function(codAssunto){
        InjecaoInfo.deleteAssuntoById(codAssunto)
        .success(function(){
            var msg = "<strong>Excluído</strong><br><p>O assunto foi excluído com sucesso.</p>";
            mensagem(msg, "success", 5000);
            getAssuntos();
        })
        .error(function(error){
            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao excluir o assunto. Por favor tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
        })
    };
    
    getAssuntos();
}
        else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        }
    }
    valida();
});