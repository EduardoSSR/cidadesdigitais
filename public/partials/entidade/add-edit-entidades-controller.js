angular.module('cidadesdigitais').controller('addEditEntidadesController', function ($scope, $http, growl, InjecaoInfo, recursoContato, $location, $filter, $window, cadastroDeEntidade, recursoEntidade, $stateParams) {

    function mensagem(msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    };
    /* --INICIO-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    var permitido = true;

    function valida() {
        $scope.modulos = '';
        InjecaoInfo.getUsuarioModulos($window.sessionStorage.idUser)
            .success(function (modulo) {
                permitido = InjecaoInfo.permissaoAcesso(12001, modulo);
                carregaController();
            }).error(function (error) {
                return error;
            });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */

    function carregaController() {
        if (permitido) {
            $scope.entidades = {};
            $scope.contatos = {};
            $scope.telefones = {};
            $scope.mensagem = '';
          

//            $scope.buscacep = function (entidade) {
//                var cepvalue = $scope.entidade;
//                console.log(cepvalue)
//
//                $http.get('URL: http://cep.republicavirtual.com.br/web_cep.php?cep=' + cepvalue + '&formato=json')
//                    .success(function (result) {
//                        console.log($scope.myData)
//                        $scope.myData = result;
//                        console.log($scope.myData)
//                    }).error(function (error) {
//                        console.log(error);
//                    });
//            }

            $http.get('read/cd/estado')
                .success(function (estado) {
                    $scope.estados = estado;

                })
                .error(function (error) {
                    console.log(error);
                });

            $scope.enviarEstado = function (uf) {
                $http.get('read/cd/municipio/' + uf)
                    .success(function (municipio) {
                        $scope.municipios = municipio;
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }
            
            
            /*================Pega Dados de ENTIDADE do serviço InjeçãoInfo ================*/
            if($stateParams.entidadeId){
                recursoEntidade.get({entidadeId: $stateParams.entidadeId}
            , function(entidade) {
                    $scope.entidades = entidade;
			}, function(erro) {
                    $scope.mensagem = 'Não foi possível obter a entidade'
			});
		}
            

            /*== Função para submeter os dados do HTML ===*/

            $scope.submeter = function (entidade) {
                console.log(entidade)
                cadastroDeEntidade.cadastrar($scope.entidade = entidade)
                    .then(function (dados) {
                        mensagem(dados.mensagem, "success", 5000);
                        if (dados.inclusao) {
                            /*$scope.entidade = {};*/
                            $location.path('/editEntidades/' + $scope.entidade.cnpj);
                        }

                    })
                    .catch(function (erro) {
                        $scope.mensagem = erro.mensagem;
                    });

            };
            
             /*================= Função para pegar os dados dos contatos ==============*/
            function getContatoFunction() {
                InjecaoInfo.getContato($stateParams.entidadeId)
                    .success(function (contato) {
                        $scope.contatos = contato;
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            }

             recursoEntidade.get({entidadeId: $stateParams.entidadeId}
            , function(entidade) {
                    $scope.entidades = entidade; 
			}, function(erro) {
                    $scope.mensagem = 'Não foi possível obter a entidade'
			});
            /*================= Função para carregar dados de telefone ==============*/
            function carregaTel() {
//                $stateParams.entidadeId, $scope.contatos.cod_contato
                InjecaoInfo.getTelefone()
                    .success(function (telefone) {
                        $scope.telefones = telefone;
                        var allTel = telefone
                    })
                    .error(function (erro) {
                        console.log(erro);
                    });
            }

            /*============== Adiciona contatos da entidade ================ */
            $scope.AddContatos = function (contato) {
                $scope.contatos = {
                    entidade_cnpj: $scope.entidades.cnpj,
                    nome: $scope.contato.nome,
                    email: $scope.contato.email,
                    funcao: $scope.contato.funcao
                };
                InjecaoInfo.postContato($scope.contatos).success(function () {
                    var msg = "<strong>Adicionado</strong><br><p>O contato " + $scope.contato.nome + " foi adicionado com sucesso</p>";
                    mensagem(msg, 'success', 5000);
                    $scope.contato = [];
                    getContatoFunction();
                }).error(function (erro) {
                    var msg = "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao atualizar o(a) </p>" + $scope.entidades.nome + ", tente novamente mais tarde.";
                    mensagem(msg, "error", 10000);
                });
            };


            /*===================== Função para adicionar o telefone ===================*/
            /* OBSERVAÇÃO  a validação de contatos iguais não esta funcionando aqui ainda*/
            $scope.addTelefone = function (telefone, contato) {
                var existe = false
                var telSelecionado = telefone.telefone
               

                for (var l = 1; l < $scope.telefones.length; l++) {
                    if ($scope.telefones[l].contato_cod_contato == contato) {
                        var telefoneSele = $scope.telefones[l]
                        if (telefoneSele.telefone == telSelecionado) {
                            existe = true;
                            break;
                        }
                    }
                }
                /*========= condicional para fazer o post do telefone ========*/
                if (existe == false) {
                    /*============= Função para adicionar o telefone e condicionaç para o usuario não inserir dados nulos ==============*/
                    if (telefone && telefone.telefone && telefone.tipo != undefined || '' || null) {
                        $scope.telefones = {
                            contato_cod_contato: contato,
                            telefone: telefone.telefone,
                            tipo: telefone.tipo
                        }
                        InjecaoInfo.postTelefone($scope.telefones)
                            .success(function () {
                                var msg = "<strong>Adicionado</strong><br><p>O telefone foi adicionado com sucesso o telefone.</p>";
                                mensagem(msg, "success", 5000);
                                carregaTel();
                        })
                            .error(function (error) {
                                var msg = "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao atualizar o(a) </p>" + $scope.entidades.nome + ", tente novamente mais tarde.";
                                mensagem(msg, "error", 10000);
                            });
                    } else {
                        var msg = "<strong>Atenção!</strong><br><p>Os campos de telefone precisão ser preenchidos</p>"
                        mensagem(msg, "warning", 10000);
                    }
                } else {
                    var msg = "<strong>Aviso!</strong><br><p>Este número de telefone já foi cadastrado no banco.</p>";
                    mensagem(msg, "warning", 10000);
                }
            }

            $scope.limpaCampoTelefone = function (telefone) {
                console.log(telefone)
                delete $scope.telefone;
            }

            /*========= Função para Remover contato entidade ========*/
            $scope.removerC = function (contato) {
                bootbox.confirm({
                    message: 'Deletar o contato ' + contato.nome + ' ?',
                    callback: function (confirmacao) {
                        if (confirmacao) {
                            InjecaoInfo.deleteContato(contato.cod_contato)
                                .success(function (contato) {
                                    getContatoFunction();
                                    var msg = "<strong>Excluido</strong><br><p>O contato foi excluido com sucesso</p>";
                                    mensagem(msg, 'success', 5000);
                                }).error(function (erro) {
                                    $scope.mensagem = 'não foi possivel remover o entidade ' + contato.nome;
                                    console.log('não foi possivel remover o entidade ' + contato.nome);
                                })
                        }
                        ;
                    },
                    buttons: {
                        cancel: {
                            label: 'Cancelar',
                            className: 'btn-default'
                        },
                        confirm: {
                            label: 'EXCLUIR',
                            className: 'btn-danger'
                        }

                    }
                });

            }



            /*========= Função para Remover telefone entidade ========*/
            $scope.removerTel = function (telefone) {
                bootbox.confirm({
                    message: 'Deletar o telefone ' + telefone.telefone + ' ?',
                    callback: function (confirmacao) {
                        if (confirmacao) {
                            //                            bootbox.alert('Telefone excluído com sucesso.');
                            InjecaoInfo.deleteTelefone(telefone.cod_telefone).success(function (telefone) {
                                var indiceTelefone = $scope.telefones.indexOf(telefone);
                                $scope.telefones.splice(indiceTelefone, 1);
                                var msg = "<strong>Excluido</strong><br><p>O telefone foi excluido com sucesso</p>";
                                mensagem(msg, 'success', 5000);
                                carregaTel();

                            }).error(function (erro) {
                                $scope.mensagem = 'não foi possivel remover o Telefone '
                                console.log('não foi possivel remover o Telefone ');
                            });
                        };
                    },
                    buttons: {
                        cancel: {
                            label: 'Cancelar',
                            className: 'btn-default'
                        },
                        confirm: {
                            label: 'EXCLUIR',
                            className: 'btn-danger'
                        }

                    }
                });

            }
            
getContatoFunction();
carregaTel();



        } else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();
});