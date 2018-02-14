angular.module('cidadesdigitais').controller('editClasseEmpController', function ($http ,$scope, $routeParams, $filter, InjecaoInfo, growl, $window) {
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
            permitido = InjecaoInfo.permissaoAcesso(21003, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    InjecaoInfo.getClasseById($routeParams.empenhoId)
    .success(function (classeById) {
            $scope.classesId = classeById;
        })
        .error(function (erro) {
            console.log(erro);
        });
    
    $scope.putClasseEmpenho = function(classesId){
        console.log(classesId)
         InjecaoInfo.putClasse(classesId)
             .success(function () {
              var msg = "<strong>Adicionada</strong><br><p>A Classe de Empenho <strong>" + $scope.classesId.cod_classe_empenho + "</strong> foi adicionado com sucesso</p>";
            mensagem(msg, 'success', 5000);
                })
            .error(function (erro) {
              var msg = "<strong>" + erro + ".</strong><br><p>Erro ao editar classe empenho.";
              mensagem(msg, 'error', 10000);
             
                    console.log(erro);
        });
    
    }
  }
    else {
        var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
        mensagem(msg, "warning", 5000);
        $window.history.back();
    };
    }
    valida();  
 })
