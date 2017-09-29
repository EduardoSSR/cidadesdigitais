angular.module('cidadesdigitais', ['minhasDiretivas', 'ngRoute', 'ngResource', 'ngAnimate', 'ngMask', 'angular-growl'])
    .config(function ($routeProvider, $locationProvider, growlProvider) {

        growlProvider.onlyUniqueMessages(false);
    
        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl: 'partials/tela-login.html'
        });
        $routeProvider.when('/cid', {
            templateUrl: 'partials/tela-login.html'
        });
        $routeProvider.when('/cid/inicio', {
            templateUrl: 'partials/inicio.html'
        });
        $routeProvider.when('/cid/usuario', {
            templateUrl: 'partials/usuario.html',
            controller: 'VisuUsuarioController'
        });
        $routeProvider.when('/cid/addUsuario', {
            templateUrl: 'partials/add_usuario.html',
            controller: 'addUsuarioController'
        });
        $routeProvider.when('/cid/editUsuario/:usuarioId', {
            templateUrl: 'partials/editar_usuario.html',
            controller: 'editUsuarioController'
        });
        $routeProvider.when('/cid/entidades', {
            templateUrl: 'partials/entidades.html',
            controller: 'visuEntidadeController'
        });
        $routeProvider.when('/cid/addEntidades', {
            templateUrl: 'partials/add_entidades.html',
            controller: 'addEntidadeController'
        });
        $routeProvider.when('/cid/editEntidades/:entidadeId', {
            templateUrl: 'partials/editar_entidades.html',
            controller: 'editEntidadeController'
        });
        $routeProvider.when('/cid/lotes', {
            templateUrl: 'partials/lotes.html',
            controller: 'visuLotesController'
        });
        $routeProvider.when('/cid/addLotes', {
            templateUrl: 'partials/add_lote.html',
            controller: 'addLotesController'
        });
        $routeProvider.when('/cid/editLote/:loteId', {
            templateUrl: 'partials/editar_lote.html',
            controller: 'editLotesController'
        });
        $routeProvider.when('/cid/cd', {
            templateUrl: 'partials/cd.html'
        });
        $routeProvider.when('/cid/addCd', {
            templateUrl: 'partials/add_cd.html',
            controller: 'addCDController'
        });
        $routeProvider.when('/cid/editCD/:cdCodIbge', {
            templateUrl: 'partials/editar_cd.html',
            controller: 'editCdController'
        });
        $routeProvider.when('/cid/empenho', {
            templateUrl: 'partials/empenho.html'
        });
        $routeProvider.when('/cid/addEmpenho', {
            templateUrl: 'partials/add_empenho.html'
        });
        $routeProvider.when('/cid/editEmpenho/:empenhoId', {
            templateUrl: 'partials/editar_empenho.html',
            controller: 'editarEmpenhoController'
        });
        $routeProvider.when('/cid/itens', {
            templateUrl: 'partials/itens.html'
        });
        $routeProvider.when('/cid/addItens', {
            templateUrl: 'partials/add_itens.html',
            controller: 'addItensController'
        });
        $routeProvider.when('/cid/editItens', {
            templateUrl: 'partials/editar_itens.html'
        });
        $routeProvider.when('/cid/municipios', {
            templateUrl: 'partials/municipios.html',
            controller: 'visuMunicipiosController'
        });
        $routeProvider.when('/cid/addMunicipios', {
            templateUrl: 'partials/add_municipios.html',
            controller: 'addMunicipiosController'
        });
        $routeProvider.when('/cid/editMunicipios', {
            templateUrl: 'partials/editar_municipios.html'
        });
        $routeProvider.when('/cid/fatura', {
            templateUrl: 'partials/fatura.html'
        });
        $routeProvider.when('/cid/addFatura', {
            templateUrl: 'partials/add_fatura.html'
        });
        $routeProvider.when('/cid/editFatura/:faturaId', {
            templateUrl: 'partials/editar_fatura.html',
            controller: 'editFaturaController'
        });
        $routeProvider.when('/cid/visualizarFatura', {
            templateUrl: 'partials/visualizar_fatura.html',
            controller: 'visuFaturaController'
        });
        $routeProvider.when('/cid/pagamento', {
            templateUrl: 'partials/pagamento.html',
            controller: 'visuPagamentoController'
        });
        $routeProvider.when('/cid/addPagamento', {
            templateUrl: 'partials/add_pagamento.html',
            controller: 'addPagamentoController'
        });
        $routeProvider.when('/cid/editarPagamento/:pagamentoId', {
            templateUrl: 'partials/editar_pagamento.html',
            controller: 'editPagamentoController'
        });
        $routeProvider.when('/cid/vizualizarPagamento', {
            templateUrl: 'partials/vizualizar_pagamento.html',
            controller: 'editPagamentoController'
        });
        $routeProvider.when('/cid/fiscalicacao', {
            templateUrl: 'partials/fiscalicacao.html'
        });
        $routeProvider.when('/cid/administracao', {
            templateUrl: 'partials/administracao.html'
        });
        $routeProvider.when('/cid/assunto', {
            templateUrl: 'partials/assunto.html',
            controller: 'visuAssuntoController'
        });
        $routeProvider.when('/cid/addAssunto', {
            templateUrl: 'partials/add_assunto.html',
            controller: 'addAssuntoController'
        });
        $routeProvider.when('/cid/editAssunto', {
            templateUrl: 'partials/editar_assunto.html'
        });
        $routeProvider.when('/cid/categoria', {
            templateUrl: 'partials/categoria.html'
        });
        $routeProvider.when('/cid/naturezaDespesas', {
            templateUrl: 'partials/natureza_despesas.html'
        });
        $routeProvider.when('/cid/addNaturezaDespesas', {
            templateUrl: 'partials/add_natureza_despesas.html',
            controller: 'addNaturezaDespController'
        });
        $routeProvider.when('/cid/editNaturezaDespesas', {
            templateUrl: 'partials/edit_natureza_despesas.html'
        });
        $routeProvider.when('/cid/addCategoria', {
            templateUrl: 'partials/add_categoria.html',
            controller: 'addCategoriaController'
        });
        $routeProvider.when('/cid/editCategoria', {
            templateUrl: 'partials/editar_categoria.html'
        });
        $routeProvider.when('/cid/classeEmpenho', {
            templateUrl: 'partials/classe_empenho.html',
            controller: 'visuEmpenhoController'
        });
        $routeProvider.when('/cid/addClasseEmpenho', {
            templateUrl: 'partials/add_classe_empenho.html',
            controller: 'addClasseEmpController'
        });
        $routeProvider.when('/cid/editClasseEmpenho/:empenhoId', {
            templateUrl: 'partials/editar_classe_empenho.html'
        });
        $routeProvider.when('/cid/etapa', {
            templateUrl: 'partials/etapa.html'
        });
        $routeProvider.when('/cid/addEtapa', {
            templateUrl: 'partials/add_etapa.html',
            controller: 'addEtapaController'
        });
        $routeProvider.when('/cid/editEtapa', {
            templateUrl: 'partials/editar_etapa.html'
        });
        $routeProvider.when('/cid/prefeito', {
            templateUrl: 'partials/prefeito.html'
        });
        $routeProvider.when('/cid/addPrefeito', {
            templateUrl: 'partials/add_prefeito.html',
            controller: 'addPrefeitoController'
        });
        $routeProvider.when('/cid/editPrefeito', {
            templateUrl: 'partials/editar_Prefeito.html'
        });
        $routeProvider.when('/cid/tipoDoItem', {
            templateUrl: 'partials/tipo_do_item.html'
        });
        $routeProvider.when('/cid/addTipoDoItem', {
            templateUrl: 'partials/add_tipoitem.html',
            controller: 'addtipoDoItemController'
        });
        $routeProvider.when('/cid/editTipoDoItem', {
            templateUrl: 'partials/editar_tipoitem.html'
        });
        $routeProvider.when('/cid/tipologia', {
            templateUrl: 'partials/tipologia.html'
        });
        $routeProvider.when('/cid/addTipologia', {
            templateUrl: 'partials/add_tipologia.html',
            controller: 'addTipologiaController',
        });
        $routeProvider.when('/cid/editTipologia', {
            templateUrl: 'partials/editar_tipologia.html'
        });
        $routeProvider.when('/cid/perfilUsuario', {
            templateUrl: 'partials/perfil_usuario.html'
        });
        $routeProvider.when('/cid/addPerfilUsuario', {
            templateUrl: 'partials/add_perfil_usuario.html',
            controller: 'addUsuarioController',
        });
        $routeProvider.when('/cid/editPerfilUsuario', {
            templateUrl: 'partials/editar_perfil_usuario.html'
        });
        $routeProvider.when('/cid/previsaoEmpenho', {
            templateUrl: 'partials/previsao_empenho.html'
        });
        $routeProvider.when('/cid/editPrevisaoEmpenho/:previsaoEmpenhoID', {
            templateUrl: 'partials/editar_previsao_empenho.html',
            controller: 'editPrevisaoEmpenhoController'
        });
        $routeProvider.when('/cid/addPrevisaoEmpenho', {
            templateUrl: 'partials/add_previsao_empenho.html'
        });
        $routeProvider.when('/cid/Erro404', {
            templateUrl: 'partials/404.ejs'
        });
        $routeProvider.otherwise({
            redirectTo: '/cid/Erro404'
        });
    });
