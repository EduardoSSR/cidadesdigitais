angular.module('cidadesdigitais').controller('visuPrefeitoController', function ($scope, $http) {
    
    $scope.prefeitos = [];
    
      var carregarPrefeitos = function (){
        $http.get("http://172.25.117.3:3000/read/prefeito").success(function(data, status){
            $scope.prefeitos = data;
        });
    };
    
    carregarPrefeitos();
    
});