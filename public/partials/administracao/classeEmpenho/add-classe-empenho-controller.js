angular.module('cidadesdigitais').controller('addClasseEmpController', function ($scope, $http, InjecaoInfo, growl, $location, $window) {
  function mensagem(msg, type, time) {
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
            permitido = InjecaoInfo.permissaoAcesso(21001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    $scope.submitClasseEmp = function(classeEmp) {
            InjecaoInfo.postClasse(classeEmp)
                .success(function () {
                    var msg = "<strong>Cadastrada</strong><br><p>Sucesso ao cadastrar a classe de empenho <strong>"+ classeEmp.cod_classe_empenho +"</strong></p>";
                    mensagem(msg, "success", 5000);
                    /*$location.path("/editClasseEmpenho/" + classeEmp.cod_classe_empenho)*/
                })
                    .error(function (erro) {
                       console.log(erro)
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
