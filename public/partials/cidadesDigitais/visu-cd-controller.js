angular.module('cidadesdigitais').controller('visuCidadedigitaisController', function ($scope,recursoCidadeDigital, InjecaoInfo, growl, $window) {
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
        InjecaoInfo.getUsuarioModulos($window.sessionStorage.idUser).success(function (modulo) {
            permitido = InjecaoInfo.permissaoAcesso(13002, modulo);
            carregaController();
        }).error(function (error) {
            return error;
        });
    }
    /* --FIM-- PERMITE, OU NAO, O ACESSO DO USUARIO */
    
    function carregaController() {
        if (permitido) {
            /*============== Funcao para trazer todas as cidades digitais cadastrados no banco de dados =================*/
            $scope.carregarCDs = function () {
                 /*================Pega Dados do serviço InjeçãoInfo ================*/
                recursoCidadeDigital.query(function (cidadeDigital) {
                    $scope.cidadesDigitais = cidadeDigital;
                }, function (erro) {
                    console.log(erro);
                });
    
            };
            
            /*============== Funcao para deletar uma cidade digital que esta cadastrada no banco de dados =================*/
            $scope.deletarCd = function (cidadeDigital) {
                bootbox.confirm({
                    message: 'Deletar o Cidade Digital ' + cidadeDigital.nome_municipio + ' ?'
                    , callback: function (confirmacao) {
                        if (confirmacao) {
                            //                            bootbox.alert('Telefone excluído com sucesso.');
                            InjecaoInfo.deleteCd(cidadeDigital.municipio_cod_ibge).success(function (cidadeDigital) {
                                var indicecidadeDigital = $scope.cidadesDigitais.indexOf(cidadeDigital);
                                $scope.cidadesDigitais.splice(indicecidadeDigital, 1);
                                var msg = "<strong>Excluido!</strong><br><p>A Cidade Digital foi excluída com sucesso.";
                                mensagem(msg, 'success', 5000);
                                $scope.carregarCDs();
                            }).error(function (erro) {
                                var msg = "<strong>Erro!</strong><br><p>A Cidade Digital não pode ser excluída. Verifique se existem informações associadas em processos, contatos ou pontos.<br><strong>Caso exista informações em acompanhamento ou fatura será impossível apagar a Cidade Digital!";
                                mensagem(msg, "error", 10000);
                                console.log('não foi possivel remover o Telefone ');
                            });
                        };
                    }
                    , buttons: {
                        cancel: {
                            label: 'Cancelar'
                            , className: 'btn-default'
                        }
                        , confirm: {
                            label: 'EXCLUIR'
                            , className: 'btn-danger'
                        }
                    }
                });
            };
            /*============== Funcao para executar o metodo carregarCds() ao entrar na pagina =================*/
            $scope.carregarCDs();
        }
        else {
            var msg = "<strong>Aviso</strong><br><p>Você não tem a permissão necessária para acessar essa página.</p>";
            mensagem(msg, "warning", 5000);
            $window.history.back();
        };
    }
    valida();
});