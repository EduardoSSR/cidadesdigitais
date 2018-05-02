angular.module('cidadesdigitais').controller('editPagamentoController', function ($scope, $routeParams, $filter, InjecaoInfo, growl, $window) {

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
            permitido = InjecaoInfo.permissaoAcesso(16003, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {
    
    /*============== Funcao para trazer as cidades digitais =================*/
    InjecaoInfo.getCds()
    .success(function (dados){
        $scope.codsIbge = dados;
    }).error(function (error){
        var msg = "<strong>Error!</strong><br><p>Ocorreu um erro ao carregar as cidades digitais do banco de dados. Por favor tente novamente mais tarde.</p>";
        mensagem(msg, "error", 10000);
    });
    
    /*============== Funcao para pegar as faturas de acordo com o cod_ibge que for selecionado pelo usuario =================*/
    $scope.selectFaturas = function(codIbge) {
        InjecaoInfo.getFaturaByCodIbge(codIbge)
        .success(function(fatura){
            $scope.faturasSelecao = fatura;
        })
        .error(function(error){
            var msg = "<strong>Error!</strong><br><p>Ocorreu um erro ao carregar as faturas do banco de dados. Por favor tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
        })
    };

    /*============== Funcao para trazer o pagamento de acordo com o co_otb selecionado =================*/
    $scope.getPagamentoById = function(){
        if($routeParams.pagamentoId){
            InjecaoInfo.getPagamentoById($routeParams.pagamentoId)
            .success(function(pagamento){
                $scope.pagamento = {
                    cod_otb: pagamento.cod_otb,
                    dt_pgto: new Date(pagamento.dt_pgto)
                };   
            })
            .error(function(error){
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar o pagamento do banco de dados. Por favor tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
        }
    }
    
    /*============== Funcao para trazer as faturas de acordo com o cod_ibge =================*/
    $scope.getFatura = function(){
        InjecaoInfo.getFaturaByOtbId($routeParams.pagamentoId)
        .success(function(fatura){
            $scope.faturas = fatura;
        })
        .error(function(error){
            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar a fatura do banco de dados. Por favor tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
        })
    }
    
    /*============== Funcao para trazer os itens de acordo com o cod_ibge =================*/
    $scope.getItens = function(){
        InjecaoInfo.getItensPagamento($routeParams.pagamentoId)
        .success(function(itensPag){
            var arrayVisuItensPagamento = [];
                        for (var i = 0; i < itensPag.length; i++) {
                            arrayVisuItensPagamento[i] = {
                                cod_empenho: itensPag[i].cod_empenho,
                                cod_item: itensPag[i].cod_item,
                                cod_tipo_item: itensPag[i].cod_tipo_item,
                                descricao_item: itensPag[i].descricao_item,
                                itens_fatura_fatura_num_nf: itensPag[i].itens_fatura_fatura_num_nf,
                                otb_cod_otb: itensPag[i].otb_cod_otb,
                                quantidade: itensPag[i].quantidade,
                                valor: itensPag[i].valor,
                                somaQuant: itensPag[i].quant_disponivel + itensPag[i].quantidade
                            }
                        }

                        $scope.itensPag = arrayVisuItensPagamento;
        })
        .error(function(){
            
        })
    }
    
    
     /* ------- Função para calcular total por unidade e o total de todos os valores  -------  */

            $scope.quantiValor = function (a, b, x) {
                $scope.itensPag[x].total = $filter('quantidadeValor')(a, b);
                var totalUnit = 0;
                for (var z = 0; z < $scope.itensPag.length; z++) {
                    totalUnit = totalUnit + $scope.itensPag[z].total;
                }
                $scope.itensPag.totalT = parseFloat(totalUnit.toFixed(2));
            }
    
    /*============== Funcao para adicionar faturas a um otb ja criado =================*/
    $scope.addFaturaPag = function(pagamento) {
        var existe = false;
        for(var g = 0; g < $scope.faturas.length; g++){
            if($scope.faturas[g].num_nf == $scope.pagamento.faturas.num_nf){
                existe = true;
                break;
            }
        }
        if(!existe){
            $scope.fatOtb = {
                otb_cod_otb: $routeParams.pagamentoId,
                fatura_num_nf: $scope.pagamento.faturas.num_nf,
                fatura_cd_municipio_cod_ibge: $scope.pagamento.faturas.cd_municipio_cod_ibge
            }

            InjecaoInfo.postFaturaPag($scope.fatOtb)
            .success(function () {
                delete $scope.pagamento;
                var msg = "<strong>Cadastrado</strong><br><p>Pagamento cadastrado com sucesso.</p>";
                mensagem(msg, "success", 5000);
                $scope.getFatura();
            })
            .error(function (error) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao cadastrar o pagamento. Por favor, tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
        }else{
            var msg = "<strong>Aviso</strong><br><p>A fatura já está cadastrada no banco.</p>";
            mensagem(msg, "warning", 5000);
        }
    }
    
    /*============== Funcao para editar o pagamento =================*/
    $scope.editDtPag = function(dtPag) {
        $scope.pagEdit = {
            cod_otb: $routeParams.pagamentoId,
            dt_pgto: $filter('date')(dtPag, 'y-MM-d')
        } 
        InjecaoInfo.putPagamento($scope.pagEdit)
        .success(function(){
            var msg = "<strong>Editado</strong><br><p>Pagamento Editado com sucesso.</p>";
            mensagem(msg, "success", 5000);
            $scope.getPagamentoById();
        })
        .error(function(error){
            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao Editar o pagamento. Por favor, tente novamente mais tarde.</p>";
            mensagem(msg, "error", 10000);
        })
    }
    
    /*============== Funcao para editar os itens do pagamento =================*/
    $scope.editItensPag = function(itemPag) {
        console.log(itemPag)
    }
    
     /* ------- Função para atualizar itens de previsão de empenho no Banco  -------  */

            $scope.editItensPag = function (itensPag) {
                var permitido = false
                var putArrayItensPagamento = [];
                for (var i = 0; i < itensPag.length; i++) {
//
//                    if ($scope.itensPag[i].somaQuant >= $scope.itensPag[i].quantidade) {
//                        permitido = true
//                    } else {
//                        permitido = false
//                        break;
                    putArrayItensPagamento[i] = {
                        otb_cod_otb: $routeParams.pagamentoId,
                        itens_fatura_fatura_num_nf: itensPag[i].itens_fatura_fatura_num_nf,
                        cod_empenho: itensPag[i].cod_empenho,
                        cod_item: itensPag[i].cod_item,
                        cod_tipo_item: itensPag[i].cod_tipo_item,
                        valor: itensPag[i].valor.toString().replace(".", "").replace(",", ""),
                        quantidade: itensPag[i].quantidade

                    }
                    
                    }

                   
//                }
                
//                if (permitido) {
                    InjecaoInfo.putArrayItensPagamento(putArrayItensPagamento)
                        .success(function () {
                            var msg = "<strong>Editado</strong><br><p>Os itens de Pagamento foram atualizados com sucesso.</p>";
                            mensagem(msg, "success", 5000);
                        })
                        .error(function (error) {
                            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao atualizar os itens de Pagamento. Por favor, tente novamente mais tarde.</p>";
                            mensagem(msg, "error", 10000);
                        })
//                } else {
//                    var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao editar o pagamento do banco de dados. Por favor, tente novamente mais tarde.</p>";
//                    mensagem(msg, "error", 10000);
//                }
//                console.log(permitido)
            }

    
    
    
    

    $scope.getPagamentoById();
    $scope.getFatura();
    $scope.getItens ();
}
    else {
        var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
        mensagem(msg, "warning", 5000);
        $window.history.back();
    };
    }
    valida();
});