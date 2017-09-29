angular.module('cidadesdigitais').controller('telaLoginController', function($scope, recursoLogin){


$scope.logins = [];
    
    recursoLogin.query(function(logins) {
    $scope.logins = logins;
  }, function(erro) {
    console.log(erro);
  });

/*$http.get('p1/logins')
    .success(function(logins){ $scope.logins = logins; })
    .error(function(error){ console.log(error)});

$scope.senhas = [];

$http.get('s1/senhas').success(function(senhas){ $scope.senhas = senhas; }).error(function(error){console.log(error)});*/

});