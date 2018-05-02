angular.module('cidadesdigitais').controller('CdContatoController', function ($scope, $stateParams, InjecaoInfo, $location, growl) {
    
    function mensagem(msg, type, time) {
        growl.general(msg, {
            ttl: time
        }, type);
    }

    var codIbge = $stateParams.cdCodIbge;
    $scope.contatos = '';
    
    /*============== Funcao que carrega todos os contatos do banco =================*/
    function getContato() {
        InjecaoInfo.getContatoByCodIbge(codIbge)
            .success(function (contato) {
         
                $scope.contatos = contato;
           
            })
            .error(function (error) {
                var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os contatos do banco de dados. Por favor tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
    };
    /*============== Funcao que tras todos os telefones do banco =================*/
/*    $scope.getTelefone = function () {
        InjecaoInfo.getTelefone()
            .success(function (telefone) {
                $scope.telefones = telefone;
            })
            .error(function (error) {
                var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os telefones do banco de dados. Por favor tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
    }*/
    /*============== Cadastra contatos em Cidades Digistais =================*/

    $scope.submeterContatosCd = function () {

        $scope.contatos = {
            cd_municipio_cod_ibge: $stateParams.cdCodIbge,
            nome: $scope.contato.nomeC,
            email: $scope.contato.email,
            funcao: $scope.contato.funcao
        };
 

        InjecaoInfo.postContato($scope.contatos)
            .success(function () {
                delete $scope.contato;
                getContato();
                var msg = "<strong>Cadastrado</strong><br><p>O contato " + $scope.contatos.nome + " foi cadastrado(a) com successo.</p>";
                mensagem(msg, "success", 5000);
            })
            .error(function (error) {
                var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao cadastrar " + $scope.contatos.nome + ". Tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });

    };
    /*============== Remove contatos em Cidades Digistais =================*/

    $scope.removerC = function (contato) {

        InjecaoInfo.deleteContato(contato.cod_contato)
            .success(function (contato) {

                var msg = "<strong>Excluido</strong><br><p>O contato foi excluido com successo.</p>";
                mensagem(msg, "success", 5000);

                getContato()


            })
            .error(function (error) {
                var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao excluir " + contato.nome + ". Tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
    };

    /*============== Adicionar telefone de contatos em Cidades Digistais =================*/
    $scope.addT = function (telefone, contato) {
        
    
        
   
    
        var existe = false;
        
        /*============= for para ler todos os telefones ================*/
       for (var l = 0; l < telefone.length ; l++) {
           
                if($scope.telefones[l].contato_cod_contato == contato.cod_contato){
                var telefoneSele = $scope.telefones[l]
               
                    if(telefoneSele.telefone == telefone.tel){
                        existe = true;
                        break;
                    }
                }
             }

        if (existe == false) {
            
           
                
            if (telefone && telefone.tipo && telefone.tel != undefined || '' || null  ) {
                
                $scope.telefones = {
                    contato_cod_contato: contato.cod_contato,
                    telefone: telefone.tel,
                    tipo: telefone.tipo
                }

                InjecaoInfo.postTelefone($scope.telefones)
                    .success(function () {
                        
                        var msg = "<strong>Adicionado</strong><br><p>Foi adicionado com sucesso o telefone <strong mask='(99)?9999- 9999'>" + $scope.telefones.telefone + "</strong> no contato de <strong>" + contato.nome + "</strong></p>";
                        mensagem(msg, "success", 5000);
                       
                         getContato();
                    })
                    .error(function (error) {

                        var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao adicionar o telefone. Tente novamente mais tarde.</p>";
                        mensagem(msg, "error", 10000);

                    });
            } else {

                var msg = "</strong><br><p>Os campos <strong>tipo telefone</strong> e <strong>telefone</strong> devem ser preenchidos.</p>";
                mensagem(msg, "error", 10000);

                getContato();
            }
        }else {
            var msg = "<strong>Aviso!</strong><br><p>Este número de telefone já foi cadastrado no banco.</p>";
           mensagem(msg, "warning", 10000);
        }
        
         document.getElementById('telefoneTel').value = '';
        document.getElementById('telefoneTipo').value = '';
    }


    /*============== Funcao que remove o telefone de acordo com o id do mesmo =================*/
    $scope.removerT = function (telefone) {
        InjecaoInfo.deleteTelefone(telefone.cod_telefone)
            .success(function () {
                getContato();
                var msg = "<strong>Excluido</strong><br><p>O telefone foi excluido com successo.</p>";
                mensagem(msg, "success", 5000);

            })
            .error(function (error) {
                var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao excluir " + telefone.tel + ". Tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });

    };

    /*============== Chama o método carregarCd() para carregar os dados da pagina de cidades digitais =================*/

    $scope.editContato = function (contato) {

        InjecaoInfo.putContato(contato)
            .success(function () {

                var msg = "<strong> Editado </strong><br><p>O contato foi editato com sucesso.</p>";
                mensagem(msg, "success", 5000);
                getContato();
            })
            .error(function (error) {
                var msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro carregar os contatos. Tente novamente mais tarde.</p>";
                mensagem(msg, "error", 10000);
            });
    }

    getContato();
});


