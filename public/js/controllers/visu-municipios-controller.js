angular.module('cidadesdigitais').controller('visuMunicipiosController', function($scope, $http){
    
    
    $scope.municipios = [];
    
    var carregarMunicipios = function (){
        $http.get("http://172.25.117.3:3000/read/municipios").success(function(data, status){
            $scope.municipios = data;
             $('#divLoading').hide();
        });
    };
    
    carregarMunicipios();
    
});