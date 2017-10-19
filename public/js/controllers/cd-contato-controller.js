angular.module('cidadesdigitais').controller('CdContatoController', function ($scope, $http, $routeParams, InjecaoInfo){
    
        /*============== Funcao que carrega todos os contatos do banco =================*/
    $scope.carregaTabela = function () {
        $http.get('read/contato/')
            .success(function (contato) {
                $scope.contatos = contato;
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os contatos do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };
    
    
     /*============== Funcao que tras todos os telefones do banco =================*/
     $scope.getTelefone = function () {
        $http.get('/read/telefone')
            .success(function (telefone) {
                $scope.telefones = telefone;
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os telefones do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    }
 /*============== Cadastra contatos em Cidades Digistais =================*/
   
    $scope.submeterContatosCd = function () {
        
        $scope.contatos = {
            cd_municipio_cod_ibge: $routeParams.cdCodIbge,
            nome: $scope.contato.nome,
            email: $scope.contato.email,
            funcao: $scope.contato.funcao
        };

        $http.post('read/contato', $scope.contatos)
            .success(function () {
                delete $scope.contato;
                $scope.carregaTabela();
                $scope.msg = "<strong>Cadastrado</strong><br><p>O contato " + $scope.contatos.nome + " foi cadastrado(a) com successo.</p>";
                $scope.mensagem($scope.msg, "success", 5000);
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao cadastrar " + $scope.contatos.nome  + ". Tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });

    };
     /*============== Remove contatos em Cidades Digistais =================*/
    $scope.removerC = function (contato) {

        $http.delete('read/contato/' + contato.cod_contato)
            .success(function (contato) {

                $scope.msg = "<strong>Excluido</strong><br><p>O contato foi excluido com successo.</p>";
                $scope.mensagem($scope.msg, "success" ,5000 );
          
            $scope.carregaTabela();
             
            })
            .error(function (error) {
                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao excluir " + contato.nome  + ". Tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    };
    
 /*============== Adicionar telefone de contatos em Cidades Digistais =================*/
    $scope.addT = function (telefone, contato) {
        console.log(telefone);
        
        
        $scope.telefones = {
            contato_cod_contato: contato.cod_contato,
            telefone: telefone.telefone,
            tipo: telefone.tipo
        }
         
        if($scope.telefones.telefone && $scope.telefones.tipo != undefined || '' || null){
        $http.post('read/telefone', $scope.telefones)
            .success(function (telefone) {
            
                $scope.msg = "<strong>Adicionado</strong><br><p>Foi adicionado com sucesso o telefone " + $scope.telefones.telefone + " no contato de " + contato.nome + "</p>";
                $scope.mensagem($scope.msg, "success", 5000);
                
                $scope.getTelefone();  
               
                delete $scope.telefone;
       
            console.log($scope.telefones);
              
            })
            .error(function (error) {
            
               $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao adicionar o telefone. Tente novamente mais tarde.</p>";
               $scope.mensagem($scope.msg, "error", 10000);
              
            });
            
        }else{
            
           $scope.msg = "</strong><br><p>Os campos <strong>tipo telefone</strong> e <strong>telefone</strong> devem ser preenchidos.</p>";
               $scope.mensagem($scope.msg, "error", 10000);
             
            $scope.getTelefone();
        }
    }

    
  /*============== Funcao que remove o telefone de acordo com o id do mesmo =================*/
    $scope.removerT = function(telefone){
      $http.delete('read/telefone/' + telefone.cod_telefone)
            .success(function (telefone) {
                var indiceTelefone = $scope.telefones.indexOf(telefone);
                $scope.telefones.splice(indiceTelefone, 1);
                $scope.getTelefone();
                $scope.msg = "<strong>Excluido</strong><br><p>O telefone foi excluido com successo.</p>";
                $scope.mensagem($scope.msg, "success" ,5000 );

            })
            .error(function (error) {
               $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao excluir " + telefone.telefone  + ". Tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
        
    };
    
 /*============== Chama o método carregarCd() para carregar os dados da pagina de cidades digitais =================*/
    
    $scope.editContato = function(contato){
        
        InjecaoInfo.putContato(contato)
         .success(function(){

            $scope.msg = "<strong> Editado </strong><br><p>O contato foi editato com sucesso.</p>";
            $scope.mensagem($scope.msg, "success", 5000);
             $scope.carregaTabela();
        })
        .error(function(error){
             $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro carregar os contatos. Tente novamente mais tarde.</p>";
            $scope.mensagem($scope.msg, "error", 10000);
        });
    }        
    $scope.getTelefone();    
     $scope.carregaTabela();
});


    //     /*============== Funcao que tras todos os telefones do banco =================*/
    //     $scope.getTelefone = function () {
    //        $http.get('/read/telefone')
    //            .success(function (telefone) {
    //                $scope.telefones = telefone;
    //            })
    //            .error(function (error) {
    //                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao carregar os telefones do banco de dados. Por favor tente novamente mais tarde.</p>";
    //                $scope.mensagem($scope.msg, "error", 10000);
    //            });
    //    }



    //    ============== Cadastra contatos em Cidades Digistais =================
    //   
    //    $scope.submeterContatosCd = function () {
    //        
    //        $scope.contatos = {
    //            cd_municipio_cod_ibge: $routeParams.cdCodIbge,
    //            nome: $scope.contato.nome,
    //            email: $scope.contato.email,
    //            funcao: $scope.contato.funcao
    //        };
    //
    //        $http.post('read/contato', $scope.contatos)
    //            .success(function () {
    //                delete $scope.contato;
    //                $scope.carregaTabela();
    //                $scope.msg = "<strong>Cadastrado</strong><br><p>O contato " + $scope.contatos.nome + " foi cadastrado(a) com successo.</p>";
    //                $scope.mensagem($scope.msg, "success", 5000);
    //            })
    //            .error(function (error) {
    //                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao cadastrar " + $scope.contatos.nome  + ". Tente novamente mais tarde.</p>";
    //                $scope.mensagem($scope.msg, "error", 10000);
    //            });
    //
    //    };
    //    

    //    /*============== Remove contatos em Cidades Digistais =================*/
    //    $scope.removerC = function (contato) {
    //
    //        $http.delete('read/contato/' + contato.cod_contato)
    //            .success(function (contato) {
    //
    //                $scope.msg = "<strong>Excluido</strong><br><p>O contato foi excluido com successo.</p>";
    //                $scope.mensagem($scope.msg, "success" ,5000 );
    //          
    //            $scope.carregaTabela();
    //             
    //            })
    //            .error(function (error) {
    //                $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao excluir " + contato.nome  + ". Tente novamente mais tarde.</p>";
    //                $scope.mensagem($scope.msg, "error", 10000);
    //            });
    //    };


    //    ============== Adicionar telefone de contatos em Cidades Digistais =================
    //    $scope.addT = function (telefone, contato) {
    //        console.log(telefone);
    //        
    //        $scope.telefones = {
    //            contato_cod_contato: contato.cod_contato,
    //            telefone: telefone.telefone,
    //            tipo: telefone.tipo
    //        }
    //        
    //        if($scope.telefones.telefone && $scope.telefones.tipo != undefined){
    //        $http.post('read/telefone', $scope.telefones)
    //            .success(function (telefone) {
    //            
    //                $scope.msg = "<strong>Adicionado</strong><br><p>Foi adicionado com sucesso o telefone " + $scope.telefones.telefone + " no contato de " + contato.nome + "</p>";
    //                $scope.mensagem($scope.msg, "success", 5000);
    //                
    //                $scope.getTelefone();  
    //             document.getElementById('telefoneTel').value=''; 
    //             document.getElementById('telelfoneTipo').value=''; 
    //              
    //            })
    //            .error(function (error) {
    //               $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao adicionar o telefone. Tente novamente mais tarde.</p>";
    //               $scope.mensagem($scope.msg, "error", 10000);
    //            });
    //            
    //        }else{
    //            
    //           $scope.msg = "</strong><br><p>Os campos <strong>tipo telefone</strong> e <strong>telefone</strong> devem ser preenchidos.</p>";
    //               $scope.mensagem($scope.msg, "error", 10000);
    //            $scope.getTelefone();
    //        }
    //    }
    //
    //    
    //    ============== Funcao que remove o telefone de acordo com o id do mesmo =================
    //    $scope.removerT = function(telefone){
    //      $http.delete('read/telefone/' + telefone.cod_telefone)
    //            .success(function (telefone) {
    //                var indiceTelefone = $scope.telefones.indexOf(telefone);
    //                $scope.telefones.splice(indiceTelefone, 1);
    //                $scope.getTelefone();
    //                $scope.msg = "<strong>Excluido</strong><br><p>O telefone foi excluido com successo.</p>";
    //                $scope.mensagem($scope.msg, "success" ,5000 );
    //
    //            })
    //            .error(function (error) {
    //               $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro ao excluir " + telefone.telefone  + ". Tente novamente mais tarde.</p>";
    //                $scope.mensagem($scope.msg, "error", 10000);
    //            });
    //        
    //    };
    //    

    //    ============== Chama o método carregarCd() para carregar os dados da pagina de cidades digitais =================
    //    
    //    $scope.editContato = function(contato){
    //        
    //        InjecaoInfo.putContato(contato)
    //         .success(function(){
    //
    //            $scope.msg = "<strong> Editado </strong><br><p>O contato foi editato com sucesso.</p>";
    //            $scope.mensagem($scope.msg, "success", 5000);
    //             $scope.carregaTabela();
    //        })
    //        .error(function(error){
    //             $scope.msg = "<strong>"+ error +"</strong><br><p>Ocorreu um erro carregar os contatos. Tente novamente mais tarde.</p>";
    //            $scope.mensagem($scope.msg, "error", 10000);
    //        });
    //    }
    //  