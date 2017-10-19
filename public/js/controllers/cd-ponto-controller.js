angular.module('cidadesdigitais').controller('CdPontoController', function ($scope, $http, $routeParams, InjecaoInfo) {


    /*============== Funcao para enviar os dados do formulario para o banco =================*/
    $scope.carregarCodibge = $routeParams.cdCodIbge;


       /*============== Funcao para chamar um Categoria do banco de dados =================*/
    $http.get('/read/categoria/')
        .success(function (categoria) {
            $scope.categorias = categoria;
        })
        .error(function (error) {
            console.log(error);
        });


    /*============== Funcao para chamar um Tipologia do banco de dados =================*/
    $http.get('/read/tipologia/')
        .success(function (tipologia) {
            $scope.tipologias = tipologia;
        })
        .error(function (error) {
            console.log(error);
        });


    
    /*============== Funcao que tras todos os pontos do servidor =================*/
    $scope.carregarPonto = function () {
        InjecaoInfo.getVisuPonto()
            .success(function (pontoTip) {
            
                $scope.pontos = InjecaoInfo.formatJsonPonto(pontoTip);   
            
            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os pontos do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });

    };

    $scope.removerPonto = function (ponto) {
        $http.delete('read/ponto/' + $scope.cod_ponto + '/' + $routeParams.cdCodIbge)
            .success(function (ponto) {

                var indicePonto = $scope.pontos.indexOf(ponto);
                $scope.pontos.splice(indicePonto, 1);

            }).error(function (error) {
                $scope.mensagem = 'Erro ao cadastradar Editpontos!';
                console.log(erro)
            });
    };



    /*============== Funcao que tras todos os pontos do servidor =================*/
    $scope.pegarparamentros = function (ponto) {
        $scope.getEditPonto = InjecaoInfo.getEditPonto(ponto)
            .success(function (pontoTip) {
                $scope.Editpontos = $scope.pontos = InjecaoInfo.formatJsonPonto(pontoTip);
                console.log($scope.Editpontos);
            })
            .error(function (error) {
                $scope.msg = "<strong>" + error + "</strong><br><p>Ocorreu um erro ao carregar os pontos do banco de dados. Por favor tente novamente mais tarde.</p>";
                $scope.mensagem($scope.msg, "error", 10000);
            });
    }

    
    
        /*====== Funcao para adicionar um elemento não repetido dentro do array de tiplogia ========*/
    $scope.armTempTipo = function (Editpontos) {
        if ($scope.mostrarTipologia != null) {
            var existe = false;
            for (var i = 0; i < $scope.mostrarTipologia.length; i++) {
                if ($scope.mostrarTipologia[i].cod_tipologia == Editpontos.descricao.cod_tipologia) {
                    existe = true;
                    break;
                } /*fim do if de comparaçao do array*/
            } /*fim do for*/
            if (existe != true) {
                $scope.mostrarTipologia[$scope.mostrarTipologia.length] = Editpontos.descricao;
            } /*fim do if de verificação se existe é true*/
        } else {
            $scope.mostrarTipologia = [Editpontos.descricao];
        } /*fim do else*/
    };


    /*============== Funcao para Remove o elemento selecionado do tipologia da tela =================*/
    $scope.remover = function (mTipologia) {
        var indicePonto = $scope.mostrarTipologia.indexOf(mTipologia);
        $scope.mostrarTipologia.splice(indicePonto, 1);
    };
 
    /*============== Funcao para enviar os dados do formulario para o banco =================*/
    $scope.enviarPonto = function (Editpontos, mTipologia) {
        var armTp = [];
        for (var r = 0; r < $scope.mostrarTipologia.length; r++) {
            armTp[r] = $scope.mostrarTipologia[r].cod_tipologia;
        };
        $scope.Editpontoss = {
            cod_ponto: Editpontos.cod_ponto,
            categoria_cod_categoria: Editpontos.categoria_cod_categoria,
            cd_municipio_cod_ibge: $scope.carregarCodibge,
            cod_tipologia: armTp,
            nome: Editpontos.nome,
            endereco: Editpontos.endereco,
            numero: Editpontos.numero,
            bairro: Editpontos.bairro,
            cep: Editpontos.cep,
            latitude: Editpontos.latitude,
            longitude: Editpontos.longitude
        };
        console.log($scope.Editpontoss);
        $http.post('read/ponto', $scope.Editpontoss)
            .success(function () {
                delete $scope.Editpontoss;
                $scope.mensagem = 'Editpontoss cadastrado!';
            })
            .error(function (erro) {
                $scope.mensagem = 'Erro ao cadastradar Editpontos!';
                console.log(erro)
            });
    };
    
    
    $scope.carregarPonto();
});