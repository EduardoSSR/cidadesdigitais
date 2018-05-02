angular.module('cidadesdigitais').controller('CdPontoController', function ($scope, $http, $routeParams, growl, InjecaoInfo) {

    /*============== Funcao para exibir as mensagens referentes ao banco =================*/
    function mensagem(msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    }

    /*captura o codigo do ibge do municipio selecionado e relaciona com uma categoria*/
    $scope.carregarCodibge = $routeParams.cdCodIbge;


    /*============== Funcao para chamar um Categoria do banco de dados =================*/
    InjecaoInfo.getCategoria()
        .success(function (categoria) {
            $scope.categorias = categoria;

        })
        .error(function (error) {
            console.log(error);
        });


    /*============== Funcao para chamar um Tipologia do banco de dados =================*/
    InjecaoInfo.getTipologia()
        .success(function (tipologia) {
            $scope.tipologias = tipologia;
        })
        .error(function (error) {
            console.log(error);
        });

    /*============== Funcao que carrega todos os pontos do banco =================*/
    function carregarPonto() {
        InjecaoInfo.getVisuPonto()
            .success(function (pontoTip) {
                $scope.visuPontos = InjecaoInfo.formatJsonPonto(pontoTip);
        
            })
            .error(function (error) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar os pontos do banco de dados. Por favor tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });

    };

      

    /*============== Funcao que tras todos os pontos do servidor =================*/
    $scope.pegarParamentros = function (ponto) {
        InjecaoInfo.getPontoById(ponto.cod_ponto, ponto.categoria_cod_categoria, ponto.cd_municipio_cod_ibge)
            .success(function (editPonto) {
                $scope.editPontoById = InjecaoInfo.formatJsonPonto(editPonto)[0];
                $scope.editPontos = $scope.editPontoById;
                $scope.novasTipologias = [];
                $('#janelaEdit').modal('show');
            })
            .error(function (error) {
                var msg = "<strong>Erro!</strong><br><p>Ocorreu um erro ao carregar o ponto do banco de dados. Por favor tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            })
    }


    /*====== Funcao para adicionar um elemento não repetido dentro do array de tiplogia ========*/
    $scope.armTempTipo = function (pontoCd) {
        if ($scope.mostrarTipologia != null) {
            var existe = false;
            for (var i = 0; i < $scope.mostrarTipologia.length; i++) {
                if ($scope.mostrarTipologia[i].cod_tipologia == pontoCd.descricao.cod_tipologia) {
                    existe = true;
                    break;
                } /*fim do if de comparaçao do array*/
            } /*fim do for*/
            if (existe != true) {
                $scope.mostrarTipologia[$scope.mostrarTipologia.length] = pontoCd.descricao;
            } /*fim do if de verificação se existe é true*/
        } else {
            $scope.mostrarTipologia = [pontoCd.descricao];
        } /*fim do else*/
    };

    /*============== Funcao para Remove o elemento selecionado do tipologia da tela de adicionar ponto =================*/
    $scope.removerAdd = function (mTipologia) {
        var indicePonto = $scope.mostrarTipologia.indexOf(mTipologia);
        $scope.mostrarTipologia.splice(indicePonto, 1);
    };


    /*====== Funcao para adicionar um elemento não repetido dentro do array de tiplogia ========*/
    $scope.armTempTipoEdit = function (pontoCd) {
        var editPonto = $scope.editPontoById.tipologias;
        var repetido = false;
        for (var w = 0; w < editPonto.length; w++) {
            if (editPonto[w].cod_tipologia == pontoCd.cod_tipologia) {
                repetido = true;
                break;
            }
        }
        if (repetido == false) {
            if ($scope.novasTipologias != null) {
                var existe = false;
                for (var i = 0; i < $scope.novasTipologias.length; i++) {
                    if ($scope.novasTipologias[i].cod_tipologia == pontoCd.cod_tipologia) {
                        existe = true;
                        break;
                    } /*fim do if de comparaçao do array*/
                } /*fim do for*/
                if (existe != true) {
                    $scope.novasTipologias[$scope.novasTipologias.length] = pontoCd;
                } /*fim do if de verificação se existe é true*/
            } else {
                $scope.novasTipologias = [pontoCd];
            } /*fim do else*/
        } else {
            var msg = "<strong>Aviso!</strong><br><p>Esta tipologia já está cadastrado no banco.</p>";
            mensagem(msg, "warning", 10000);
        }
    };

    /*============== Funcao para Remove o elemento selecionado do tipologia da tela de adicionar ponto =================*/
    $scope.removerNovasEdit = function (novaTipologia) {
        var indicePonto = $scope.novasTipologias.indexOf(novaTipologia);
        $scope.novasTipologias.splice(indicePonto, 1);
    };



    /*============== Funcao para enviar os dados do formulario para o banco =================*/
    $scope.enviarPontoAdd = function () {
        var existe = false;
        for (var m = 0; m < $scope.mostrarTipologia.length; m++) {
            if ($scope.mostrarTipologia[m].cod_ponto == $scope.pontoCd.cod_ponto) {
                existe = true;
                break;
            }
        }
        if (existe == false) {
            var armTp = [];
            if ($scope.mostrarTipologia != null) {
                for (var r = 0; r < $scope.mostrarTipologia.length; r++) {
                    armTp[r] = $scope.mostrarTipologia[r].cod_tipologia;
                };
            }
            $scope.pontoCds = {
                cod_ponto: $scope.pontoCd.cod_ponto,
                categoria_cod_categoria: $scope.pontoCd.categoria_cod_categoria,
                cd_municipio_cod_ibge: $scope.carregarCodibge,
                cod_tipologia: armTp,
                nome: $scope.pontoCd.nome,
                endereco: $scope.pontoCd.endereco,
                numero: $scope.pontoCd.numero,
                complemento: $scope.pontoCd.complemento,
                bairro: $scope.pontoCd.bairro,
                cep: $scope.pontoCd.cep,
                latitude: $scope.pontoCd.latitude,
                longitude: $scope.pontoCd.longitude
            };
            console.log($scope.pontoCds)
            InjecaoInfo.postPonto($scope.pontoCds)
                .success(function () {
                    delete $scope.pontoCd;
                    delete $scope.mostrarTipologia;
                    $('#janelaAdd').modal('hide');
                    var msg = "<strong>Cadastrado</strong><br><p>Ponto cadastrado com sucesso.</p>";
                    mensagem(msg, "success", 5000);
                    carregarPonto();
                })
                .error(function (erro) {
                    $scope.mensagem = 'Erro ao cadastradar pontoCds!';
                });
        } else {
            var msg = "<strong>Aviso</strong><br><p>Este número de ponto já existe no banco.</p>";
            mensagem(msg, "warning", 5000);
        }
        carregarPonto();
    };





    /*============== Funcao para remover ponto do servidor =================*/

    $scope.removerPonto = function (ponto) {
        bootbox.confirm({
            message: 'Tem certeza que deseja deletar o ponto <strong>' + ponto.cod_ponto + '</strong> ?',
            callback: function (confirmacao) {
                if (confirmacao) {
                    InjecaoInfo.delPonto(ponto)
                        .success(function () {
                            var indicePonto = $scope.visuPontos.indexOf(ponto);
                            $scope.visuPontos.splice(indicePonto, 1);
                            carregarPonto();
                            var msg = '<strong>Excluído</strong><br><p>O ponto <strong>' + ponto.cod_ponto + '</strong> foi excluído com sucesso.</p>';
                            mensagem(msg, "success", 5000);
                        }).error(function (error) {
                            var msg = '<strong>Erro!</strong><br><p>Ocorreu um erro ao excluir o ponto. Por favor, tente novamente mais tarde.</p>';
                            mensagem(msg, "error", 5000);
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
    };



    //Não funciona ainda porque a rota de editar está em discução, como deverar ser para enviar tipologia

    /*============== Funcao para Remove o elemento selecionado do tipologia da tela de editar ponto =================*/
    $scope.removerEditar = function (mTipologia, editPontos) {
        console.log(editPontos);
        console.log(mTipologia);
        InjecaoInfo.delTipo(mTipologia, editPontos)
            .success(function () {
                var indicePonto = $scope.editPontos.tipologias.indexOf(mTipologia);
                $scope.editPontos.tipologias.splice(indicePonto, 1);
                var msg = "<strong>Excluído</strong><br><p>A tipologia foi excluída com sucesso.</p>";
                mensagem(msg, "success", 5000);
            }).error(function (error) {
                $scope.mensagem = 'Erro ao cadastradar editPontos!';
                console.log(erro)
            });
    };

    /*====== Funcao para adicionar um elemento não repetido dentro do array de tiplogia ========*/
    $scope.armTempTipo = function (editPontos) {
        if ($scope.mostrarTipologia != null) {
            var existe = false;
            for (var i = 0; i < $scope.mostrarTipologia.length; i++) {
                if ($scope.mostrarTipologia[i].cod_tipologia == editPontos.descricao.cod_tipologia) {
                    existe = true;
                    break;
                } /*fim do if de comparaçao do array*/
            } /*fim do for*/
            if (existe != true) {
                $scope.mostrarTipologia[$scope.mostrarTipologia.length] = editPontos.descricao;
            } /*fim do if de verificação se existe é true*/
        } else {
            $scope.mostrarTipologia = [editPontos.descricao];
        } /*fim do else*/
    };


    /*============== Funcao para enviar os dados do formulario para o banco =================*/
    $scope.enviarPontoEdit = function (editPontos) {
        var armTp = [];
        var enviarEditPontos = [];
        if ($scope.novasTipologias) {
            for (var r = 0; r < $scope.novasTipologias.length; r++) {
                armTp[r] = $scope.novasTipologias[r].cod_tipologia;
            };
        }
        enviarEditPontos = {
            cod_ponto: editPontos.cod_ponto,
            categoria_cod_categoria: editPontos.categoria_cod_categoria,
            cd_municipio_cod_ibge: $scope.carregarCodibge,
            cod_tipologia: armTp,
            nome: editPontos.nome,
            endereco: editPontos.endereco,
            numero: editPontos.numero,
            bairro: editPontos.bairro,
            complemento: editPontos.complemento,
            cep: editPontos.cep,
            latitude: editPontos.latitude,
            longitude: editPontos.longitude
        };

        InjecaoInfo.putPonto(enviarEditPontos)
            .success(function () {
                var msg = "<strong>Editado</strong><br><p>Os dados do ponto <strong>" + enviarEditPontos.nome + "</strong> foram atualizados com sucesso.</p>";
                mensagem(msg, "success", 5000);
                $scope.novasTipologias = [];
                $('#janelaEdit').modal('hide');
            })
            .error(function () {
                var msg = "<strong>Erro</strong><br><p>Ocorreu um erro ao atualizar os dados do ponto <strong>" + enviarEditPontos.nome + "</strong>.Por favor, tente noamente mais tarde.</p>";
                mensagem(msg, "error", 5000);
            });
    };

    carregarPonto();

});
