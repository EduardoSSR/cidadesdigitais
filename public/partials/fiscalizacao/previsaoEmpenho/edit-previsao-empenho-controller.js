angular.module('cidadesdigitais').controller('editPrevisaoEmpenhoController', function ($scope, $http, $routeParams, $filter, InjecaoInfo, growl, $window) {

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    }

    /* --INICIO-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    var permitido = true;
    $scope.prevEmpenhos = '';

    function valida() {
        $scope.modulos = '';
        InjecaoInfo.getUsuarioModulos($window.sessionStorage.idUser)
            .success(function (modulo) {
                permitido = InjecaoInfo.permissaoAcesso(18003, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */



    /* ------- Função para carregar opção de tipo de reajuste na tela  -------  */
    function carregaController() {
        if (permitido) {

            $scope.tipos = [{
                name: "Reajuste",
                value: "R"
    }, {
                name: "Original",
                value: "O"
    }];


            /* ------- Função para  carregar Previsão Empenho do Banco  -------  */

            $scope.getPrevEmpById = function () {
                InjecaoInfo.getPrevEmpById($routeParams.previsaoEmpenhoID)
                    .success(function (prevEmpenho) {
                        $scope.prevEmpenhos = {
                            cod_previsao_empenho: prevEmpenho.cod_previsao_empenho,
                            lote_cod_lote: prevEmpenho.lote_cod_lote,
                            natureza_despesa_cod_natureza_despesa: prevEmpenho.natureza_despesa_cod_natureza_despesa,
                            descricao: prevEmpenho.descricao,
                            data: new Date(prevEmpenho.data),
                            tipo: prevEmpenho.tipo,
                            ano_referencia: prevEmpenho.ano_referencia
                        };
                    $scope.getLotes(prevEmpenho.lote_cod_lote);

                    
                    })
                    .error(function (error) {
                        var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar a previsão de empenho do banco de dados. Por favor, tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };
            

            /* ------- Função para atualizar previsão de empenho no Banco  -------  */

            $scope.putPrevEmpenho = function (editEmpenhos) {
                $scope.prevEditEmpenho = {};

                $scope.prevEditEmpenho = {
                    cod_previsao_empenho: editEmpenhos.cod_previsao_empenho,
                    lote_cod_lote: editEmpenhos.lote_cod_lote,
                    natureza_despesa_cod_natureza_despesa: editEmpenhos.natureza_despesa_cod_natureza_despesa,
                    data: $filter('date')(editEmpenhos.data, "y-MM-dd"),
                    tipo: editEmpenhos.tipo,
                    ano_referencia: editEmpenhos.ano_referencia
                };
                

                InjecaoInfo.putPrevEmpenho($scope.prevEditEmpenho)
                    .success(function () {
                        var msg = "<strong>Editado</strong><br><p>A previsão de empenho " + $scope.prevEditEmpenho.cod_previsao_empenho + " foi editada com sucesso </p>";
                        mensagem(msg, "success", 5000);
                        $scope.getPrevEmpById();
                    })
                    .error(function (error) {
                        var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao editar a previsão de empenho do banco de dados. Por favor, tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    })
            };

            /* ------- Função para calcular total por unidade e o total de todos os valores  -------  */

            $scope.quantiValor = function (a, b, x) {
                $scope.visuItensEmpenhos[x].total = $filter('quantidadeValor')(a, b);
                var totalUnit = 0;
                for (var z = 0; z < $scope.visuItensEmpenhos.length; z++) {
                    totalUnit = totalUnit + $scope.visuItensEmpenhos[z].total;
                }
                $scope.visuItensEmpenhos.totalT = parseFloat(totalUnit.toFixed(2));
            }



            /* ------- Função para carregar itens de previsão de empenho no Banco  -------  */

            $scope.getLotes = function () {
                InjecaoInfo.getPrevisaoEmpenhoItens($scope.prevEmpenhos.lote_cod_lote ,$routeParams.previsaoEmpenhoID)
                    .success(function (visuItensEmpenho) {
                        var arrayVisuItensEmpenho = [];
                        
                        for (var i = 0; i < visuItensEmpenho.length; i++) {
                            arrayVisuItensEmpenho[i] = {
                                cod_item: visuItensEmpenho[i].cod_item,
                                descricao: visuItensEmpenho[i].descricao,
                                quantidade: visuItensEmpenho[i].quantidade,
                                tipo_item_cod_tipo_item: visuItensEmpenho[i].tipo_item_cod_tipo_item,
                                valor: visuItensEmpenho[i].valor,
                                quant_disponivel: visuItensEmpenho[i].quant_disponivel,
                                somaQuant: visuItensEmpenho[i].quant_disponivel + visuItensEmpenho[i].quantidade
                            }
                        }

                        $scope.visuItensEmpenhos = arrayVisuItensEmpenho
                        console.log($scope.visuItensEmpenhos);

                    })
                    .error(function (error) {
                        var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar os lotes do banco de dados. Por favor, tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };



            /* ------- Função para atualizar itens de previsão de empenho no Banco  -------  */

            $scope.updatePrevEmpItens = function (visuItensEmpenhos) {
                var permitido = false

                var putArrayItensEmpenho = [];
                for (var i = 0; i < $scope.visuItensEmpenhos.length; i++) {

                    if ($scope.visuItensEmpenhos[i].somaQuant >= $scope.visuItensEmpenhos[i].quantidade) {
                        permitido = true
                    } else {
                        permitido = false
                        break;
                    }

                    putArrayItensEmpenho[i] = {
                        previsao_empenho_cod_previsao_empenho: $routeParams.previsaoEmpenhoID,
                        lote_itens_itens_cod_item: $scope.visuItensEmpenhos[i].cod_item,
                        lote_itens_itens_tipo_item_cod_tipo_item: $scope.visuItensEmpenhos[i].tipo_item_cod_tipo_item,
                        lote_itens_lote_cod_lote: $scope.prevEmpenhos.lote_cod_lote,
                        valor: $scope.visuItensEmpenhos[i].valor.toString().replace(".", "").replace(",", ""),
                        quantidade: $scope.visuItensEmpenhos[i].quantidade

                    }
                }
                if (permitido) {
                    InjecaoInfo.putPrevisaoEmpenhoItens(putArrayItensEmpenho)
                        .success(function () {
                            var msg = "<strong>Editado</strong><br><p>Os itens da previsão de empenho foram atualizados com sucesso.</p>";
                            mensagem(msg, "success", 5000);
                        })
                        .error(function (error) {
                            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao atualizar os itens da previsão de empenho. Por favor, tente novamente mais tarde.</p>";
                            mensagem(msg, "error", 10000);
                        })
                } else {
                    var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao editar a previsão de empenho do banco de dados. Por favor, tente novamente mais tarde.</p>";
                    mensagem(msg, "error", 10000);
                }
                console.log(permitido)
            }


            $scope.getPrevEmpById();
            
            /* ------- Faz parte da autenticação  -------  */

        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();
});