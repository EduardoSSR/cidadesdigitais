angular.module('cidadesdigitais').controller('editEntidadeController', function ($scope, $http, $routeParams, growl) {

    $scope.entidades = {};
    $scope.contatos = {};
    $scope.telefones = {};
    $scope.mensagem = '';

    $scope.entidadeId = $routeParams.entidadeId;


    function mensagem(msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    }

    /* Carrega Dados */
    function carregaTabela() {
        $http.get('read/contato/')
            .success(function (contato) {
                $scope.contatos = contato;

            })
            .error(function (erro) {
                console.log(erro);
            });
    };

    $http.get('read/entidades/' + $routeParams.entidadeId)
        .success(function (entidade) {
            $scope.entidades = entidade;

        }).error(function (erro) {
            console.log(erro);
        });

    function carregaTel() {
        $http.get('read/telefone')
            .success(function (telefone) {

                $scope.telefones = telefone;


            }).error(function (erro) {
                console.log(erro);
            });
    }

    /*Adiciona */

    $scope.AddContatos = function (contato) {

        $scope.contatos = {
            entidade_cnpj: $scope.entidades.cnpj,
            nome: $scope.contato.nome,
            email: $scope.contato.email,
            funcao: $scope.contato.funcao
        };


        $http.post('read/contato', $scope.contatos)
            .success(function () {

                console.log($scope.contatos);

                carregaTabela();
                delete $scope.contato;
                $scope.mensagem = 'Contato da entidade cadastrado!';
            })
            .error(function (erro) {
                console.log($scope.contato);
                $scope.mensagem = 'Erro ao cadastradar Entidade!';
                console.log(erro)
            });
    };


    $scope.AddContatos = function (contato) {

        $scope.contatos = {
            entidade_cnpj: $scope.entidades.cnpj,
            nome: $scope.contato.nome,
            email: $scope.contato.email,
            funcao: $scope.contato.funcao
        };


        $http.post('read/contato', $scope.contatos)
            .success(function () {
                carregaTabela();
                delete $scope.contato;
                $scope.mensagem = 'Contato da entidade cadastrado!';
            })
            .error(function (erro) {

                $scope.mensagem = 'Erro ao cadastradar Entidade!';
                console.log(erro)
            });
    };



    $scope.addT = function (telefone, contato) {

        /*$http.get('read/contato/' + contatoCod).success(function(contato){$scope.contatos=contato}).erro(function(error){});
        if($scope.contatos.quantContatos <= 10){           
        Fazer essa verificação. Ps:ver com o back dps pra poder trazer a quant de contatos em read/contato/id   
        O THIAGO FALOU PRA DEIXAR ILIMITADO  18/09/2017*/

        $scope.telefones = {
            contato_cod_contato: contato,
            telefone: telefone.telefone,
            tipo: telefone.tipo
        }

        console.log($scope.telefones);

        $http.post('read/telefone', $scope.telefones)
            .success(function () {
                $scope.msg = "<strong>Adicionado</strong><br><p>Foi adicionado com sucesso o telefone " + $scope.telefones.telefone + " no contato de " + contato.nome + "</p>";
                mensagem($scope.msg, "success", 5000);
                carregaTel();
            })
            .error(function (error) {
                carregaTel();
            });
        /*}else{
            msg de erro!(não pode cadastrar mais de 10 contatos);
          }
        */

    }




    /*Remover contato entidade*/
    $scope.removerC = function (contato) {

        $http.delete('read/contato/' + contato.cod_contato)
            .success(function (contato) {

                console.log(contato.cod_contato);
                var indiceContato = $scope.contatos.indexOf(contato);
                $scope.contatos.splice(indiceContato, 1);
                $scope.msg = "<strong>Excluido</strong><br><p>O contato foi excluido com sucesso</p>";
                mensagem($scope.msg, 'success', 5000);
            })
            .error(function (erro) {
                $scope.mensagem = 'não foi possivel remover o entidade ' + contato.nome;
                console.log('não foi possivel remover o entidade ' + contato.nome);
            });
    };

    $scope.removerT = function (telefone) {

        $http.delete('read/telefone/' + telefone.cod_telefone)
            .success(function (telefone) {

                var indiceTelefone = $scope.telefones.indexOf(telefone);
                $scope.telefones.splice(indiceTelefone, 1);

                carregaTel();

            })
            .error(function (erro) {
                $scope.mensagem = 'não foi possivel remover o entidade '
                console.log('não foi possivel remover o entidade ');
            });
    };

    /* ======função para editar entidade com HTTP put======*/

    $scope.editarEntidade = function (entidades) {

        $scope.entidades = {
            cnpj: $scope.entidades.cnpj,
            nome: $scope.entidades.nome,
            endereco: $scope.entidades.endereco,
            numero: $scope.entidades.numero,
            bairro: $scope.entidades.bairro,
            cep: $scope.entidades.cep,
            nome_municipio: $scope.entidades.nome_municipio,
            uf: $scope.entidades.uf,
            observacao: $scope.entidades.observacao
        };
        $http.put('read/entidades', $scope.entidades)
            .success(function () {
                console.log($scope.entidades);
                $scope.msg = "<strong>Cadastrado!</strong><br>" + $scope.entidades.nome + " foi atualizado(a) com sucesso.";
                mensagem($scope.msg, "success", 5000);

            })
            .error(function (erro) {
                console.log($scope.entidade);
                $scope.msg = "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao atualizar o(a) </p>" + $scope.entidades.nome + ", tente novamente mais tarde.";
                mensagem($scope.msg, "error", 10000);
            });


        console.log(entidades);

    };





    carregaTabela();
    carregaTel();
});