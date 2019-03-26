angular.module('cidadesdigitais').controller('visuMunicipiosController', function($scope, $http,$filter, InjecaoInfo, growl, $window){
    
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
            permitido = InjecaoInfo.permissaoAcesso(24002, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    let filtros = {
        mun: '',
        uf :''
    }
    
    

    function carregaController(){
    if (permitido) {
    
    $scope.municipios = [];
    
    var carregarMunicipios = function (){
            $http.get("/read/municipios").success(function(data, status){
            $scope.numPerPage = 50;
            $scope.noOfPages = Math.ceil(data.length/$scope.numPerPage);
            $scope.currentPage = 1;

            $scope.setPage = function(){
                $scope.municipios = data.slice(($scope.currentPage-1)*$scope.numPerPage,(($scope.currentPage-1)*$scope.numPerPage)+$scope.numPerPage);
            };
            $scope.$watch('currentPage',$scope.setPage);
             $('#divLoading').hide();
        });
    }; 

    carregarMunicipios();

    $scope.filtroMunicipio = function(filtros){
        
        if(!filtros.mun && !filtros.uf){
            $http.get("/read/municipios").success(function(data, status){
                $scope.numPerPage = 50;
                $scope.noOfPages = Math.ceil(data.length/$scope.numPerPage);
                $scope.currentPage = 1;
    
                $scope.setPage = function(){
                    $scope.municipios = data.slice(($scope.currentPage-1)*$scope.numPerPage,(($scope.currentPage-1)*$scope.numPerPage)+$scope.numPerPage);
                };
                $scope.$watch('currentPage',$scope.setPage);
                 $('#divLoading').hide();
            });
        }
         else{
             let valida;
             
             $http.get("/read/municipios/").success(function(data, status){
             let municipio = data.filter(municipios =>{
                 valida = true;
                 if(filtros.mun && !municipios.nome_municipio.toString().toLowerCase().includes(filtros.mun.toLowerCase())){valida = false;}
                 if(filtros.uf && !municipios.uf.toString().toLowerCase().includes(filtros.uf.toLowerCase())){valida = false;}

                 return valida;
             });

             $scope.municipios = municipio;
             $scope.numPerPage = 50;
             $scope.noOfPages = Math.ceil($scope.municipios.length/$scope.numPerPage);
             $scope.currentPage = 1;

             $scope.setPage = function(){
                $scope.municipios = $scope.municipios.slice(($scope.currentPage-1)*$scope.numPerPage,(($scope.currentPage-1)*$scope.numPerPage)+$scope.numPerPage);
             };
             $scope.$watch('currentPage',$scope.setPage);
             $('#divLoading').hide();
             });
         }
    }
   
    //    Metodo para retorna o array de estado armazenado no servidor
      $http.get('read/cd/estado')
        .success(function(estado){
           $scope.estados = estado;
        })
        .error(function(error){
            console.log(error);
        });


    }
    else {
        var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
        mensagem(msg, "warning", 5000);
        $window.history.back();
    };
    }
    valida();

})
