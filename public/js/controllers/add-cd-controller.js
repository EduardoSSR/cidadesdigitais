angular.module('cidadesdigitais').controller('addCDController', function ($scope, $http, growl) {   
    
    $scope.mensagem = '';
    
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    $scope.mensagem = function(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }

//    Metodo para retorna os dados da tupla de lote
       $http.get('read/lotes/')
        .success(function(loteCd){
           $scope.loteCds = loteCd;
         
        })
        .error(function(error){
            console.log(error);
        });
    
//    Metodo para retorna o array de estado armazenado no servidor
      $http.get('read/cd/estado')
        .success(function(estado){
           $scope.estados = estado;
         
        })
        .error(function(error){
            console.log(error);
        });
    
//    Metodo para retorna o os municipio relacionados com os estados enviados.    
       $scope.vemMunicipio = function(uf){
        $http.get('read/cd/municipio/' + uf)
        .success(function(municipio){
           $scope.municipios = municipio;
        })
        .error(function(error){
            console.log(error);
        });
        }
    
//Metodo para enviar o UF(estado) para o servidor
    $scope.enviarEstado = function(cidadeDigitais){
        $scope.unidadeFederal = cidadeDigitais;
       $http.post('/read/cd/municipio')
        .success(function(cidadeDigital){
        $scope.vemMunicipio($scope.unidadeFederal.uf);
         
        })
        .error(function(error){
            console.log(error);
        });
    }

//    Metodo para enviar as informações da pagina para o servidor, logo para o banco
    $scope.submite = function () {
        $http.post('read/cd', $scope.digitalCidade)
            .success(function () {    
                delete $scope.ufCd;
                delete $scope.digitalCidade;
                $scope.formAddCD.$setPristine();        
                $scope.msg = "<strong>Cadastrado</strong><br><p>Cidade digital cadastrada com successo.</p>";
                $scope.mensagem($scope.msg, 'success', 5000);
            })
            .error(function (error) {    
            console.log(error)
                $scope.msg = "<strong>" + error.msg + "</strong><br><p>Ocorreu um erro ao cadastrar a cidade digital. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, 'error', 10000);
            });
// javascript:location.href="cid/empenho";

    };
    



});
