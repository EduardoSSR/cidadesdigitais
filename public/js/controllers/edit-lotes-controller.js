angular.module('cidadesdigitais').controller('editLotesController', function ($scope, $http, $routeParams, $filter, growl) {
    

    $scope.loteId = $routeParams.loteId;
    
    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    $scope.mensagem = function(msg , type, time){
        growl.general(msg, {ttl: time}, type);
    }
    

    /*============== Funcao para carregar o lote ao banco de dados de acordo com seu id =================*/
    $scope.carregarLote = function(){
        if ($routeParams.loteId) {
            $http.get("read/lotes/" + $routeParams.loteId)
                .success(function (data) {
                    $scope.lote = {
                        cod_lote: data.cod_lote,
                        entidade_nome: data.nome,
                        contrato: data.contrato,
                        dt_inicio_vig: new Date($filter('date')(data.dt_inicio_vig, "yyyy-MM-dd")),
                        dt_final_vig: new Date($filter('date')(data.dt_final_vig, "yyyy-MM-dd")),
                        dt_reajuste: new Date($filter('date')(data.dt_reajuste, "yyyy-MM-dd"))
                    };
                    $scope.getEntidades();
                })
                .error(function (error) {
                    $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
        };
    };
    
    
    /*============== Funcao para carregar os itens do banco de dados =================*/
    $scope.getItens = function(){
        $http.get("read/loteItens/" + $routeParams.loteId)
            .success(function (item) {
                $scope.itens = item;
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
        });
    };
    
    
    /*============== Funcao para carregar do banco de dados as previsoes de empenho referentes ao lote =================*/
    $scope.getPrevEmpenhos = function(){
        $http.get("read/previsaoEmpenho")
            .success(function (prevEmpenho) {
                $scope.prevEmpenhos = prevEmpenho;
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar as previsões de empenho do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
        });
    };
    
    
    /*============== Funcao para carregar do banco de dados os reajustes referentes ao lote =================*/
    $scope.getReajustes = function(){
        $http.get("read/reajuste")
            .success(function (reajuste) {
                $scope.reajustes = reajuste;
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os reajustes do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
        });
    };
    
    $scope.getEntidades = function(){
        $http.get('read/entidades')
        .success(function(entidade){
            $scope.entidades = entidade;
        })
        .error(function(error){
            $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar as entidades do banco de dados. Por favor tente novamente mais tarde.</p>";
            $scope.mensagem($scope.msg, "error", 10000);
        })
    };

    
    /*============== Funcao para editar o lote =================*/
    $scope.editLote = function () {
        
        $scope.lotes = {
            cod_lote: $routeParams.loteId,
            entidade_cnpj: $scope.lote.entidade_cnpj,
            contrato: $scope.lote.contrato,
            dt_inicio_vig: $filter('date')($scope.lote.dt_inicio_vig, "yyyy-MM-dd"),
            dt_final_vig: $filter('date')($scope.lote.dt_final_vig, "yyyy-MM-dd"),
            dt_reajuste: $filter('date')($scope.lote.dt_reajuste, "yyyy-MM-dd")
        };

        $http.put('read/lotes/', $scope.lotes)
            .success(function () {
                $scope.msg = "<strong>Editado</strong><br><p>O lote " + $scope.lotes.cod_lote + " foi editado com sucesso.</p>";
                $scope.mensagem($scope.msg, "success", 5000);
                $scope.carregarLote();
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao ediatr o lote " + $scope.lotes.cod_lote + ". Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });

    };




    /*============== Funcao para atualizar os itens alterados no banco de dados =================*/
    $scope.armTempItens = function (itens) {
        $scope.itensLote = [];
        for (var r = 0; r < itens.length; r++) {
            $scope.itensLote[r] = {
                lote_cod_lote: $scope.lote.cod_lote,
                itens_cod_item: itens[r].cod_item,
                itens_tipo_item_cod_tipo_item: itens[r].tipo_item_cod_tipo_item,
                preco: itens[r].preco
            }
        }
        $http.put('read/loteItens/', $scope.itensLote)
            .success(function (){
                $scope.msg = "<strong>Atualizado</strong><br><p>Os Itens foram atualizados com sucesso.</p>";
                $scope.mensagem($scope.msg, "success", 5000);
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao atualizar os itens. Por favor tente novamente mais tarde.</p>";
            $scope.mensagem($scope.msg, "error", 10000);
            });
    };
    
    
    /*============== Funcao para adicionar os reajustes =================*/
    $scope.addReajuste = function(){
        
        $scope.reajusteLote = {
            ano_ref: $scope.reajuste.ano_ref,
            lote_cod_lote: $scope.loteId,
            percentual: $scope.reajuste.percentual
        }
        
        $http.post('read/reajuste', $scope.reajusteLote)
        .success(function(){
            $scope.msg = "<strong>Cadastrado</strong><br><p>O rejuste foi cadastrado com sucesso.</p>";
            $scope.mensagem($scope.msg, "success", 5000);
            delete $scope.reajuste;
            $scope.formReajuste.$setPristine();
            $scope.getReajustes();
        })
        .error(function(error){
            $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao cadastrar o reajuste. Por favor tente novamente mais tarde.</p>";
            $scope.mensagem($scope.msg, "error", 10000);
        });
    }
    
    
    /*============== Funcao para excluir os reajustes de acordo com id do lote e o ano de referencia passados =================*/
    $scope.removReajuste = function(reajuste){
        
        $http.delete('read/reajuste/' + $scope.loteId + '/' + reajuste.ano_ref)
        .success(function(){
            $scope.msg = "<strong>Excluído</strong><br><p>O rejuste foi excluído com sucesso.</p>";
            $scope.mensagem($scope.msg, "success", 5000);
            $scope.getReajustes();
        })
        .error(function(error){
            $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao excluir o reajuste. Por favor tente novamente mais tarde.</p>";
            $scope.mensagem($scope.msg, "error", 10000);
        });
    };
    
    
    
        $scope.carregarLote();
        $scope.getReajustes();
        $scope.getPrevEmpenhos();
        $scope.getItens();
});