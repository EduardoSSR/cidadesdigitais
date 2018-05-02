angular.module('cidadesdigitais').controller('addUsuarioController', function ($scope, $resource, growl, InjecaoInfo, $location, $timeout, $filter, $window) {
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
            permitido = InjecaoInfo.permissaoAcesso(11001, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
        $scope.modulos = [];
        $scope.selecionados = [];
        /*============== Funcao para adicionar usuarios no banco de dados =================*/
        $scope.submeter = function () {
            if ($scope.selecionados != "") {
                if ($scope.formularioAddUsuario.$valid) {
                    var tel = $scope.usuario.telefone.replace("(","").replace(")","").replace(" ","").replace(" ","").replace("-","")
                    var usuarios = {
                        nome: $scope.usuario.nome
                        , login: $scope.usuario.login
                        , senha: $scope.usuario.senha
                        , email: $scope.usuario.email
                        , telefone: tel
                        , modulos: $scope.selecionados
                    }
                    InjecaoInfo.postUsuario(usuarios).success(function () {
                        var msg = "<strong>Cadastrado</strong><br><p> O usuário <strong>" + usuarios.nome + "</strong> foi cadastrado com successo.</p>";
                        mensagem(msg, "success", 5000);
                        delete $scope.usuario;
                        $scope.formularioAddUsuario.$setPristine();
                        $location.path("/usuario")
                    }).error(function (error) {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao cadastrar o usuário " + $scope.usuario.nome + ". Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
                }
            }
            else {
                var msg = "<strong>Aviso</strong><br><p>É necessário adicionar um módulo para cadastrar o usuário.</p>";
                mensagem(msg, "warning", 5000);
            }
        };
        $scope.checkModulo = function (cod) {
            var valida = false;
            if ($scope.selecionados == '' || $scope.selecionados === undefined) {
                $scope.selecionados[0] = cod;
            }
            else {
                for (var t = 0; t < $scope.selecionados.length; t++) {
                    if ($scope.selecionados[t] == cod) {
                        var indiceModulo = $scope.selecionados.indexOf(cod);
                        $scope.selecionados.splice(indiceModulo, 1);
                        valida = true;
                        break;
                    };
                };
                if (valida === false) {
                    $scope.selecionados[$scope.selecionados.length] = cod;
                }
            };
            console.log($scope.selecionados)
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