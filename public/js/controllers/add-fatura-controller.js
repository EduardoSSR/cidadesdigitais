angular.module('cidadesdigitais').controller('addFaturaController', function ($scope, $http, $filter) {
    $scope.addDadosFatura = [];
    $scope.mensagem = '';

    $scope.inserirFatura = function (fatura) {
        $scope.faturas = fatura;
        $scope.formFatura.$setPristine();
        console.log($scope.faturas);
        delete $scope.fatura;
    };
    
    $http.get('read/cd')
        .success(function (dados){
            $scope.codsIbge = dados;
    }).error(function (erro){
        console.log(erro);
    });

    $scope.inserirFatura = function (fatura) {
        if ($scope.formFatura.$valid) {
            $scope.faturas = {
                num_nf: $scope.fatura.num_nf,
                cd_municipio_cod_ibge : $scope.fatura.municipio_cod_ibge,
                dt_nf: $filter('date')($scope.fatura.dt_nf,"yyyy-MM-dd")
            }
            console.log($scope.faturas);
            $http.post('read/fatura', $scope.faturas)
                .success(function () {
                    console.log($scope.faturas);
                    delete $scope.fatura;
                    $scope.formFatura.$setPristine();
                    $scope.mensagem = 'fatura cadastrada!';
                })
                .error(function (erro) {
                    console.log(erro);
                    $scope.mensagem = 'Erro ao cadastradar fatura!';
                });
        }
    };

    
    
    
});
