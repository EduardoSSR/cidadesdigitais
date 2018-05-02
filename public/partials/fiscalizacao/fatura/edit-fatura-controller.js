angular.module('cidadesdigitais').controller('editFaturaController', function ($location, $scope, $stateParams, $filter, InjecaoInfo, growl, $window) {


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
                permitido = InjecaoInfo.permissaoAcesso(17003, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */

    function carregaController() {
        if (permitido) {

            function getFaturaEdit() {
                InjecaoInfo.getFaturaEdit($stateParams.faturaId, $stateParams.cod_ibge)
                    .success(function (fatura) {
                        $scope.faturas = fatura;
                        getPagamentosFatura();
                        getItensFatura(fatura.cd_municipio_cod_ibge);
                        getPrevisaoEmpenho();
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            }

            function getItensFatura(codIbge) {
                InjecaoInfo.getItensFatura($stateParams.faturaId, $stateParams.cod_ibge)
                    .success(function (itemFatura) {
                        var i = [];
                        for (var x = 0; x < itemFatura.length; x++) {
                            i[x] = {
                                cod_empenho: itemFatura[x].cod_empenho,
                                cod_item: itemFatura[x].cod_item,
                                descricao: itemFatura[x].descricao,
                                descricao_item: itemFatura[x].descricao_item,
                                fatura_num_nf: itemFatura[x].fatura_num_nf,
                                quant_disponivel: itemFatura[x].quant_disponivel,
                                quantidade: itemFatura[x].quantidade,
                                tipo_item_cod_tipo_item: itemFatura[x].tipo_item_cod_tipo_item,
                                unidade: itemFatura[x].unidade,
                                valor: itemFatura[x].valor,
                                quant_max: itemFatura[x].quant_disponivel + itemFatura[x].quantidade
                            }
                        }
                        $scope.itensFatura = i;
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            }

            function getItem() {
                InjecaoInfo.getItem()
                    .success(function (item) {
                        $scope.itens = item;
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            }

            function getPagamentosFatura() {
                InjecaoInfo.getPagamentosFatura($stateParams.faturaId, $scope.faturas.cd_municipio_cod_ibge)
                    .success(function (pagamentoFatura) {
                        $scope.pagamentoFaturas = pagamentoFatura;
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            }

            function getPrevisaoEmpenho() {
                InjecaoInfo.getFaturaTotal($stateParams.faturaId)
                    .success(function (Faturatotal) {
                        if (Faturatotal[0].total != null) {
                            $scope.Faturastotal = Faturatotal[0].total;
                        } else {
                            $scope.Faturastotal = 0;
                        }
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            };



            $scope.enviarCodItem = function (item) {
                $scope.faturaEmpenho = {};
                !item ? $scope.natureza = "" : $scope.natureza = item.descricao;
                InjecaoInfo.EnviarItem(item, $scope.faturas)
                    .success(function (inforItem) {
                        $scope.inforItens = inforItem;
                    }).error(function (erro) {
                        var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar as informações de itens do banco de dados. Por favor tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);
                    });
            };

            $scope.PegarfaturaEmpenho = function (a) {
                var inforItens = {
                    municipio_cod_ibge: a.municipio_cod_ibge,
                    cod_empenho: a.cod_empenho,
                    quantidade: 0,
                    valor: a.valor,
                    quant_max: a.quantidade
                }
                $scope.faturaEmpenho = inforItens;
            }

            $scope.EnviaFatura = function (item, faturaEmpenho, faturas) {
                var itensFatura = $scope.itensFatura;
                var existe = false;
                for (var x = 0; x < itensFatura.length; x++) {
                    if ((itensFatura[x].descricao_item == item.item_descricao) && (itensFatura[x].cod_empenho == faturaEmpenho.cod_empenho)) {
                        existe = true;
                        break;
                    }
                }
                if (existe != true) {
                    var itemFatura = {
                        fatura_num_nf: faturas.num_nf,
                        cod_empenho: faturaEmpenho.cod_empenho,
                        cod_item: item.cod_item,
                        cod_tipo_item: item.tipo_item_cod_tipo_item,
                        valor: faturaEmpenho.valor,
                        quantidade: faturaEmpenho.quantidade,
                        cod_ibge: faturas.cd_municipio_cod_ibge
                    }
                    InjecaoInfo.postItensFatura(itemFatura)
                        .success(function () {
                            getItensFatura(faturas.cd_municipio_cod_ibge);
                            var msg = "<strong>Cadastrado!</strong><br><strong>" + item.item_descricao + "</strong> foi cadastrado(a) com sucesso.";
                            mensagem(msg, "success", 5000);
                            $scope.faturaEmpenho = {};
                            $scope.item.descricao = '';
                            $scope.inforItens.cod_empenho = '';
                        }).error(function (erro) {
                            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao cadastar as informações de itens do banco de dados. Por favor tente novamente mais tarde.</p>";
                            mensagem(msg, "error", 10000);
                        });
                } else {
                    var msg = "<strong>Aviso!</strong><br><p>O item <strong>" + item.item_descricao + "</strong> já está cadastrado na fatura <strong>" + faturas.num_nf + "</strong>.</p>";
                    mensagem(msg, "warning", 10000);
                }
            };

            $scope.editarItensFatura = function (itensFatura, fatura) {
                var quantMax = false;
                var itemMax = '';
                for (var b = 0; b < itensFatura.length; b++) {
                    if (itensFatura[b].quantidade > itensFatura[b].quant_max) {
                        itemMax = itensFatura[b].descricao_item;
                        quantMax = true;
                        break;
                    }
                }
                if (quantMax != true) {
                    var alterItensFatura = [];
                    for (var x = 0; x < itensFatura.length; x++) {
                        alterItensFatura[x] = {
                            cod_empenho: itensFatura[x].cod_empenho,
                            fatura_num_nf: itensFatura[x].fatura_num_nf,
                            cod_item: itensFatura[x].cod_item,
                            cod_tipo_item: itensFatura[x].tipo_item_cod_tipo_item,
                            quantidade: itensFatura[x].quantidade,
                            valor: itensFatura[x].valor,
                            cod_ibge: fatura.cd_municipio_cod_ibge
                        }
                    }
                    InjecaoInfo.alterItemFatura(alterItensFatura)
                        .success(function () {
                            var msg = "<strong>Atualizados!</strong><br>Os itens foram atualizados com sucesso.";
                            mensagem(msg, "success", 5000);
                            getFaturaEdit();
                        }).error(function (erro) {
                            var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao alterar as informação do item no banco de dados. Por favor tente novamente mais tarde.</p>";
                            mensagem(msg, "error", 10000);
                        });
                } else {
                    var msg = "<strong>Aviso!</strong><br><p>Não foi possível atualizar os itens pois a quantidade do item <strong>" + itemMax + "</strong> ultrapassou a quantidade disponível.</p>";
                    mensagem(msg, "warning", 10000);
                }
            }

            $scope.removerItemF = function (itemFatura, faturas) {
                var fatura = itemFatura;
                bootbox.confirm({
                    message: 'Tem certeza que deseja deletar o item <strong>' + fatura.descricao_item + '</strong> da fatura <strong>' + fatura.fatura_num_nf + '</strong> ?',
                    callback: function (confirmacao) {
                        if (confirmacao) {
                            InjecaoInfo.delItemFatura(fatura, faturas.cd_municipio_cod_ibge)
                                .success(function () {
                                    var msg = "<strong>Excluído</strong><br><p>O item <strong>" + fatura.descricao_item + "</strong> foi excluido com sucesso.</p>";
                                    mensagem(msg, "success", 5000);
                                    var indiceItemFatura = $scope.itensFatura.indexOf(fatura);
                                    $scope.itensFatura.splice(indiceItemFatura, 1);
                                }).error(function (error) {
                                    var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao excluir o item <strong>" + fatura.descricao_item + "</strong>. Verifique se existe dados que precisam ser apagados.</p>";
                                    mensagem(msg, "error", 10000);
                                });
                        };
                    },
                    buttons: {
                        cancel: {
                            label: 'Cancelar',
                            className: 'btn-default'
                        },
                        confirm: {
                            label: 'Excluir',
                            className: 'btn-danger'
                        }

                    }
                });
            }

            $scope.calcularTotal = function () {

            }

            getFaturaEdit();
            getItem();
        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();
});
