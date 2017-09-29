angular.module('cidadesdigitais').controller('addCdProcessoController', function ($scope, $http, $routeParams) {

  
    
    
    
    $scope.MadaIBGE = function (cidadeDigital) {
     console.log(cidadeDigital);
        $scope.cod_ibge = cidadeDigital;
    }

  console.log($scope.cod_ibge);

    /*============== Funcao para enviar os dados do formulario para o banco =================*/
    $scope.processoEnv = function (processo, cidadeDigital) {
        $scope.processos = {
            cod_processo: processo.num_processos,
            cd_municipio_cod_ibge: $scope.cod_ibge,
            descricao: processo.descricao
        };
        console.log($scope.processos);

        //        $http.post('read/processo', $scope.processos)
        //            .success(function () {
        //                delete $scope.processos;
        //                $scope.mensagem = 'Processo cadastrado!';
        //            })
        //            .error(function (erro) {
        //                console.log($scope.processos);
        //                $scope.mensagem = 'Erro ao cadastradar Processo!';
        //                console.log(erro)
        //            });
    };




});