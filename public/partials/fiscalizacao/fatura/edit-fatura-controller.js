angular.module('cidadesdigitais').controller('editFaturaController', function ($location, $scope, $routeParams, $filter, InjecaoInfo, growl, $window) {


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
            permitido = InjecaoInfo.permissaoAcesso(17003, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController(){
    if (permitido) {

    function getFaturaEdit(){
        InjecaoInfo.getFaturaEdit($routeParams.faturaId)
            .success(function (fatura) {
                $scope.faturas = fatura;
                getPagamentosFatura();
            })
            .error(function (erro) {
                console.log(erro);
        });
    }

    function getItensFatura(){
        InjecaoInfo.getItensFatura($routeParams.faturaId)
            .success(function (itemFatura) {
                $scope.itensFatura = itemFatura;

            })
            .error(function (erro) {
                console.log(erro);
        });
    }

    function getItem(){
        InjecaoInfo.getItem()
            .success(function (item) {
                $scope.itens = item;
            })
            .error(function (erro) {
                console.log(erro);
        });
    }
    
    function getPagamentosFatura(){
        InjecaoInfo.getPagamentosFatura($routeParams.faturaId, $scope.faturas.cd_municipio_cod_ibge)
            .success(function (pagamentoFatura) {
                $scope.pagamentoFaturas = pagamentoFatura;
            })
            .error(function (erro) {
                console.log(erro);
        });
    }
    
    function getPrevisaoEmpenho() {
        InjecaoInfo.getFaturaTotal($routeParams.faturaId)
            .success(function (Faturatotal) {
                $scope.Faturastotal = Faturatotal;
            })
            .error(function (erro) {
                console.log(erro);
            });
    };
    


    $scope.enviarCodItem = function (item) {
        if (!item) {
            $scope.natureza = "";
        } else {
            $scope.natureza = item.descricao;
        }
        InjecaoInfo.EnviarItem(item, $scope.faturas)
            .success(function (inforItem) {
                $scope.inforItens = inforItem;
            }).error(function (erro) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar as informações de itens do banco de dados. Por favor tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
    };

    $scope.PegarfaturaEmpenho = function (inforItens) {
        $scope.faturaEmpenho = inforItens;
    }

    $scope.EnviaFatura = function (item, inforItens, faturaEmpenho, faturas) {
        console.log(inforItens)
        $scope.fFatura = {
            fatura_num_nf: faturas.num_nf,
            cod_empenho: inforItens.cod_empenho,
            cod_item: item.cod_item,
            cod_tipo_item: item.tipo_item_cod_tipo_item,
            valor: faturaEmpenho.valor,
            quantidade: faturaEmpenho.quantidade
        }
        InjecaoInfo.postItensFatura($scope.fFatura)
            .success(function () {
                var msg = "<strong>Cadastrado!</strong><br>" + item.item_descricao + " foi cadastrado(a) com sucesso.";
                mensagem(msg, "success", 5000);


            }).error(function (erro) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao cadastar as informações de itens do banco de dados. Por favor tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
    };

    $scope.alterCampQV = function (itemFatura) {

        $scope.alterItensFatura = {
            cod_empenho: itemFatura.cod_empenho,
            fatura_num_nf: itemFatura.fatura_num_nf,
            cod_item: itemFatura.cod_item,
            cod_tipo_item: itemFatura.cod_tipo_item,
            quantidade: itemFatura.quantidade,
            valor: itemFatura.valor
        }
        console.log($scope.alterItensFatura);
        InjecaoInfo.alterItemFatura($scope.alterItensFatura)
            .success(function () {
                getPrevisaoEmpenho();
                var msg = "<strong>Alterado!</strong><br>" + itemFatura.item_descricao + " foi alterado(a) com sucesso.";
                mensagem(msg, "success", 5000);

            }).error(function (erro) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao alterar as informação do item no banco de dados. Por favor tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
    }

    $scope.removerItemF = function (itemFatura) {
        console.log(itemFatura);
        InjecaoInfo.delItemFatura(itemFatura)
            .success(function () {
                var msg = "<strong>Excluído</strong><br><p>O item " + itemFatura.item_descricao + " foi excluido com sucesso.</p>";
                mensagem(msg, "success", 5000);
                var indiceItemFatura = $scope.itensFatura.indexOf(itemFatura);
                $scope.itensFatura.splice(indiceItemFatura, 1);
            }).error(function (error) {
                var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao excluir o item " + itemFatura.item_descricao + ". Verifique se existe dados que precisam ser apagados.</p>";
                mensagem(msg, "error", 10000);
            });
    }
    
    $scope.calcularTotal = function(){
        
    }

    getFaturaEdit();
    getItensFatura();
    getItem();
    getPrevisaoEmpenho();
        }
    else {
        var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
        mensagem(msg, "warning", 5000);
        $window.history.back();
    };
    }
    valida();
});