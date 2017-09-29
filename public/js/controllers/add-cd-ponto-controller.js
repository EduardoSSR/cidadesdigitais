angular.module('cidadesdigitais').controller('addCdPontoController', function ($scope, $http) {

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


    /*============== Funcao para Remove o elemento selecionado do tipologia da tela =================*/
    $scope.remover = function (mTipologia) {
        var indicePonto = $scope.mostrarTipologia.indexOf(mTipologia);
        $scope.mostrarTipologia.splice(indicePonto, 1);
    };

    /*============== Funcao para pegar o cod_ibge do controle do editar_cd e anexa nesse controller =================*/
    $scope.MadaIBGE = function (cidadeDigital) {
        $scope.cod_ibge = cidadeDigital;
    }

    /*============== Funcao para enviar os dados do formulario para o banco =================*/
    $scope.enviarPonto = function (pontoCd, mTipologia, cidadeDigital) {
        var armTp = [];
        for (var r = 0; r < $scope.mostrarTipologia.length; r++) {
            armTp[r] = $scope.mostrarTipologia[r].cod_tipologia;
        };
        $scope.pontoCds = {
            cod_ponto: pontoCd.cod_ponto,
            categoria_cod_categoria: pontoCd.categoria_cod_categoria,
            cd_municipio_cod_ibge: $scope.cod_ibge,
            cod_tipologia: armTp,
            nome: pontoCd.nome,
            endereco: pontoCd.endereco,
            numero: pontoCd.numero,
            bairro: pontoCd.bairro,
            cep: pontoCd.cep,
            latitude: pontoCd.latitude,
            longitude: pontoCd.longitude
        };
        console.log($scope.pontoCds);
        /*$http.post('read/ponto', $scope.pontoCds)
            .success(function () {
                delete $scope.pontoCds;
                $scope.mensagem = 'pontoCds cadastrado!';
            })
            .error(function (erro) {
                $scope.mensagem = 'Erro ao cadastradar pontoCds!';
                console.log(erro)
            });*/
    };

});