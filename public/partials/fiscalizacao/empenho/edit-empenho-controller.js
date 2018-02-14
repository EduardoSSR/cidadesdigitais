angular.module('cidadesdigitais').controller('editarEmpenhoController', function ($scope,$http, $routeParams, $filter, InjecaoInfo, growl, $window) {

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
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
                permitido = InjecaoInfo.permissaoAcesso(15003, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */

    function carregaController() {
        if (permitido) {
            $scope.eventos = [];
            $scope.filtro = '';



            /*====================== Função para editar dados de empenho =======================*/

            $scope.editarEmpenho = function (empenhos) {
                $scope.empenhos = {
                    cod_empenho: $scope.empenhos.cod_empenho,
                    data: new Date($scope.empenhos.data).toISOString().slice(0, 10).replace('T', ' '),
                    previsao_empenho_cod_previsao_empenho: empenhos.previsao_empenho_cod_previsao_empenho
                }
                InjecaoInfo.putEmpenho($scope.empenhos)
                    .success(function () {
                        var msg = "<strong>Alterado</strong><br><p>As alterações foram feitas com sucesso.</p>";
                        mensagem(msg, "success", 5000);
                        $scope.getEmpenhoById();
                    })
                    .error(function (erro) {
                        var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao alterar o empenho do banco de dados. Por favor, tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    })
            }

            $scope.meuFiltro = function (a, b, x) {
                $scope.empenhoItens[x].total = $filter('quantidadeValor')(a, b);
                var totalUnit = 0;
                
                for (var z = 0; z < $scope.empenhoItens.length; z++) {
                    totalUnit = totalUnit + $scope.empenhoItens[z].total;
                }
                $scope.empenhoItens.totalT = parseFloat(totalUnit.toFixed(2));
            }

            /*====================== Função para carregar dados de empenho por ID =======================*/
            $scope.getEmpenhoById = function () {
                InjecaoInfo.getEmpenhoById($routeParams.empenhoId)
                    .success(function (empenho) {

                        $scope.empenhos = {
                            cod_empenho: empenho.cod_empenho,
                            lote_cod_lote: empenho.lote_cod_lote,
                            ano_referencia: empenho.ano_referencia,
                            tipo: empenho.tipo,
                            previsao_empenho_cod_previsao_empenho: empenho.previsao_empenho_cod_previsao_empenho,
                            data: new Date(empenho.data),
                            descricao: empenho.descricao
                        };
                    
                     $http.get("/read/previsaoEmpenhoItens/quantidade/" +  $scope.empenhos.lote_cod_lote)
                            .success(function(dado){
                            console.log(dado)
                            
                        })
                        
                    })
                    .error(function (error) {
                        var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar o empenho do banco de dados. Por favor, tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            }
            
           
           /*
*/




            /*====================== Função para trazer os dados dos itens por ID do banco =======================*/

            $scope.getEmpenhoItensById = function () {
                if ($routeParams.empenhoId) {
                    InjecaoInfo.getEmpenhoItensById($routeParams.empenhoId)
                        .success(function (empenhoItem) {
                            var arrayempenhoItens = [];
                            $scope.quantidadeDisponivel = [
                                {qtd: 444},
                                {qtd: 448},
                                {qtd: 443},
                                {qtd: 444},
                                {qtd: 449},
                                {qtd: 44},
                                {qtd: 355},
                                {qtd: 34},
                                {qtd: 434},
                                {qtd: 23},
                                {qtd: 123},
                                {qtd: 432}, 
                                {qtd: 444},
                                {qtd: 844},
                                {qtd: 344},
                                {qtd: 444},
                                {qtd: 944},
                                {qtd: 44},
                                {qtd: 355},
                                {qtd: 34},
                                {qtd: 434},
                                {qtd: 23},
                                {qtd: 123},
                                {qtd: 432},
                                {qtd: 44},
                                {qtd: 355},
                                {qtd: 34},
                                {qtd: 434},
                                {qtd: 23},
                                {qtd: 123},
                                {qtd: 1253},
                                {qtd: 432}
                            ]
                            
                            for (var i = 0; i < empenhoItem.length; i++) {
                             
                               
                                arrayempenhoItens[i] = {
                                    descricao_item: empenhoItem[i].descricao_item,
                                    cod_empenho: empenhoItem[i].cod_empenho,
                                    cod_previsao_empenho: empenhoItem[i].cod_previsao_empenho,
                                    cod_item: empenhoItem[i].cod_item,
                                    cod_tipo_item: empenhoItem[i].cod_tipo_item,
                                    descricao: empenhoItem[i].descricao,
                                    quantidade: empenhoItem[i].quantidade,
                                    tipo_item_cod_tipo_item: empenhoItem[i].tipo_item_cod_tipo_item,
                                    valor: empenhoItem[i].valor.toString(),
                                    quantidadeDisponivel: $scope.quantidadeDisponivel[i].qtd
                                }

                            }
                           
                            $scope.empenhoItens = arrayempenhoItens;
                        })
                        .error(function (erro) {
                            console.log(erro);
                        });
                }
            }



            /*====================== Função para editar dados de itens por ID e enviar para o servidor =======================*/

            $scope.updateEditItens = function () {
                var permitido = false
                
                $scope.empenhoItensArray = []
                for (var r = 0; r < $scope.empenhoItens.length; r++) {
                    
                    if($scope.empenhoItens[r].quantidadeDisponivel >= $scope.empenhoItens[r].quantidade){
                        permitido = true
                    }else{
                        permitido = false
                        break;
                    }
                    
                    $scope.empenhoItensArray[r] = {
                        cod_empenho: $scope.empenhoItens[r].cod_empenho,
                        cod_item: $scope.empenhoItens[r].cod_item,
                        cod_previsao_empenho: $scope.empenhoItens[r].cod_previsao_empenho,
                        cod_tipo_item: $scope.empenhoItens[r].tipo_item_cod_tipo_item,
                        valor: $scope.empenhoItens[r].valor.toString().replace(".", "").replace(".", "").replace(",", ""),
                        quantidade: $scope.empenhoItens[r].quantidade
                    }
                }
                if(permitido){
                InjecaoInfo.putItensEmpenho($scope.empenhoItensArray)
                    .success(function () {
                        var msg = "<strong>Atualizado</strong><br><p>Os Itens foram atualizados com sucesso.</p>";
                        mensagem(msg, "success", 5000);
                    })
                    .error(function () {
                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao atualizar os itens. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    })
                    }else{
                         var msg = "<strong> Atenção </strong><br><p>Não foi possivel atualizar os itens, <strong>quantidade disponivel</strong> não é o suficiente para a <strong>quantidade</strong> .</p>";
                        mensagem(msg, "warning", 10000);
                    }

            }


            $scope.getEmpenhoItensById();
            $scope.getEmpenhoById();
        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();


});