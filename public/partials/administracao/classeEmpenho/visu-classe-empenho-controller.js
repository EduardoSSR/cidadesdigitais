angular.module('cidadesdigitais').controller('visuClasseEmpController', function ($scope, InjecaoInfo, growl, $window) {
     function mensagem(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    /* --INICIO-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    var permitido = true;

    function valida() {
    $scope.modulos = '';
    InjecaoInfo.getUsuarioModulos($window.sessionStorage.idUser)
        .success(function (modulo) {
            permitido = InjecaoInfo.permissaoAcesso(21002, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
$scope.getClasse = function(){
     InjecaoInfo.getClasse()
        .success(function (ClasseEmp) {
        $scope.classeEmps = ClasseEmp;
    })
        .error(function (error) {
        console.log(error)
    });
}

   
    
    
    $scope.excluiClasseEmp = function (classeEmp) {
        InjecaoInfo.deleteClasse(classeEmp.cod_classe_empenho)
            .success(function () {
            var msg = "<strong>Excluido</strong><br><p>O Classe de empenho foi excluido com sucesso</p>";
            mensagem(msg, 'success', 5000);
             $scope.getClasse()
        })
            .error(function (error) {
            console.log(error)
        });
    }
    
    
    $scope.getClasse();
    }
    else {
        var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
        mensagem(msg, "warning", 5000);
        $window.history.back();
    };
    }
    valida();
});