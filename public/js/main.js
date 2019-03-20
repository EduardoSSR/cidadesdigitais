//angular.module('cidadesdigitais',['ui.bootstrap']);
angular.module('cidadesdigitais', ['minhasDiretivas','ui.bootstrap.pagination','ngRoute','ngResource', 'ngAnimate', 'ngMask', 'ngCookies', 'angular-growl'])
    .config(function ($routeProvider, $locationProvider, growlProvider, $httpProvider) {

//	 CorreiosProvider.default.endpoint  =  '/my.new.correios.api/{POSTAL_CODE}/json';
//    'angular-correios'
//    CorreiosProvider

        $httpProvider.interceptors.push('tokenInterceptor');
    
        growlProvider.onlyUniqueMessages(false);

        $locationProvider.html5Mode(true);

        $routeProvider.when('/telalogin', {
            templateUrl: 'partials/tela-login.html',
            controller: 'telaLoginController'
        });

        $routeProvider.when('/manutencao', {
            templateUrl: 'js/views/manutencao.html'
        });
        $routeProvider.when('/inicio', {
            templateUrl: 'partials/inicio.html'
        });
    
        /* USUARIO */
        $routeProvider.when('/usuario', {
            templateUrl: 'partials/usuario/visu-usuario.html',
            controller: 'VisuUsuarioController'
        });
        $routeProvider.when('/addUsuario', {
            templateUrl: 'partials/usuario/add-usuario.html',
            controller: 'addUsuarioController'
        });
        $routeProvider.when('/editUsuario/:usuarioId', {
            templateUrl: 'partials/usuario/edit-usuario.html',
            controller: 'editUsuarioController'
        });
    
        /* ENTIDADES */
        $routeProvider.when('/entidades', {
            templateUrl: 'partials/entidade/entidades.html',
            controller: 'visuEntidadeController'
        });
        $routeProvider.when('/addEntidades', {
            templateUrl: 'partials/entidade/add-entidades.html',
            controller: 'addEntidadeController'
        });
        $routeProvider.when('/editEntidades/:entidadeId', {
            templateUrl: 'partials/entidade/editar-entidades.html',
            controller: 'editEntidadeController'
        });
    
        /* LOTE */
        $routeProvider.when('/lotes', {
            templateUrl: 'partials/lote/visu-lote.html',
            controller: 'visuLotesController'
        });
        $routeProvider.when('/addLotes', {
            templateUrl: 'partials/lote/add-lote.html',
            controller: 'addLotesController'
        });
        $routeProvider.when('/editLote/:loteId', {
            templateUrl: 'partials/lote/edit-lote.html',
            controller: 'editLotesController'
        });
    
        /*CD*/
    
        $routeProvider.when('/cd', {
            templateUrl: 'partials/cidadesDigitais/cd.html'
        });
        $routeProvider.when('/addCd', {
            templateUrl: 'partials/cidadesDigitais/add-cd.html',
            controller: 'addCDController'
        });
        $routeProvider.when('/editCD/:cdCodIbge', {
            templateUrl: 'partials/cidadesDigitais/editar-cd.html',
            controller: 'editCdController'
        });
    
        /* EMPENHO */
        $routeProvider.when('/empenho', {
            templateUrl: 'partials/fiscalizacao/empenho/visu-empenho.html'
        });
        $routeProvider.when('/addEmpenho', {
            templateUrl: 'partials/fiscalizacao/empenho/add-empenho.html'
        });
        $routeProvider.when('/editEmpenho/:empenhoId', {
            templateUrl: 'partials/fiscalizacao/empenho/edit-empenho.html',
            controller: 'editarEmpenhoController'
        });
    
        /* ITEM */
        $routeProvider.when('/itens', {
            templateUrl: 'partials/administracao/item/visu-item.html'
        });
        $routeProvider.when('/addItens', {
            templateUrl: 'partials/administracao/item/add-item.html',
            controller: 'addItensController'
        });
        $routeProvider.when('/editItens', {
            templateUrl: 'partials/administracao/item/edit-item.html'
        });
    
        /* MUNICIPIO */
        $routeProvider.when('/municipios', {
            templateUrl: 'partials/administracao/municipio/visu-municipio.html',
            controller: 'visuMunicipiosController'
        });
        $routeProvider.when('/addMunicipios', {
            templateUrl: 'partials/administracao/municipio/add-municipio.html',
            controller: 'addMunicipiosController'
        });
        $routeProvider.when('/editMunicipios', {
            templateUrl: 'partials/administracao/municipio/edit-municipio.html'
        });
    
        /* FATURA */
        $routeProvider.when('/fatura', {
            templateUrl: 'partials/fiscalizacao/fatura/visu-fatura.html'
        });
        $routeProvider.when('/addFatura', {
            templateUrl: 'partials/fiscalizacao/fatura/add-fatura.html'
        });
        $routeProvider.when('/editFatura/:faturaId', {
            templateUrl: 'partials/fiscalizacao/fatura/edit-fatura.html',
            controller: 'editFaturaController'
        });
    
        /* PAGAMENTO */    
        $routeProvider.when('/pagamento', {
            templateUrl: 'partials/fiscalizacao/pagamento/visu-pagamento.html',
            controller: 'visuPagamentoController'
        });
        $routeProvider.when('/addPagamento', {
            templateUrl: 'partials/fiscalizacao/pagamento/add-pagamento.html',
            controller: 'addPagamentoController'
        });
        $routeProvider.when('/editarPagamento/:pagamentoId', {
            templateUrl: 'partials/fiscalizacao/pagamento/edit-pagamento.html',
            controller: 'editPagamentoController'
        });
    
        $routeProvider.when('/fiscalicacao', {
            templateUrl: 'partials/fiscalicacao.html'
        });
        $routeProvider.when('/administracao', {
            templateUrl: 'partials/administracao.html'
        });
    
        /* ASSUNTO */
        $routeProvider.when('/assunto', {
            templateUrl: 'partials/administracao/assunto/visu-assunto.html',
            controller: 'visuAssuntoController'
        });
        $routeProvider.when('/addAssunto', {
            templateUrl: 'partials/administracao/assunto/add-assunto.html',
            controller: 'addAssuntoController'
        });
        $routeProvider.when('/editAssunto/:idAssunto', {
            templateUrl: 'partials/administracao/assunto/edit-assunto.html',
            controller: 'editAssuntoController'
        });
    
        /* NATUREZA DESPESA */
        $routeProvider.when('/naturezaDespesas', {
            templateUrl: 'partials/administracao/naturezaDespesa/visu-natureza-despesa.html'
        });
        $routeProvider.when('/addNaturezaDespesas', {
            templateUrl: 'partials/administracao/naturezaDespesa/add-natureza-despesa.html',
            controller: 'addNaturezaDespController'
        });
        $routeProvider.when('/editNaturezaDespesas/:naturezaDepId', {
            templateUrl: 'partials/administracao/naturezaDespesa/edit-natureza-despesa.html',
             controller: 'editNaturezaDespController'
        });
    
        /* CATEGORIA */
        $routeProvider.when('/categoria', {
            templateUrl: 'partials/administracao/categoria/visu-categoria.html',
            controller: 'admCategoriaController'
        });
        $routeProvider.when('/addCategoria', {
            templateUrl: 'partials/administracao/categoria/add-categoria.html',
            controller: 'admCategoriaController'
        });
        $routeProvider.when('/editCategoria/:idCategoria', {
            templateUrl: 'partials/administracao/categoria/edit-categoria.html',
            controller: 'admCategoriaController'
        });
    
        /* CLASSE EMPENHO */
        $routeProvider.when('/classeEmpenho', {
            templateUrl: 'partials/administracao/classeEmpenho/visu-classe-empenho.html',
            controller: 'visuEmpenhoController'
        });
        $routeProvider.when('/addClasseEmpenho', {
            templateUrl: 'partials/administracao/classeEmpenho/add-classe-empenho.html',
            controller: 'addClasseEmpController'
        });
        $routeProvider.when('/editClasseEmpenho/:empenhoId', {
            templateUrl: 'partials/administracao/classeEmpenho/edit-classe-empenho.html',
            controller: 'editClasseEmpController'
        });
    
        /* ETAPA */
        $routeProvider.when('/etapa', {
            templateUrl: 'partials/administracao/etapa/visu-etapa.html'
        });
        $routeProvider.when('/addEtapa', {
            templateUrl: 'partials/administracao/etapa/add-etapa.html',
            controller: 'addEtapaController'
        });
        $routeProvider.when('/editEtapa', {
            templateUrl: 'partials/administracao/etapa/edit-etapa.html'
        });
    
        /* PREFEITO */
        $routeProvider.when('/prefeito', {
            templateUrl: 'partials/administracao/prefeito/visu-prefeito.html'
        });
        $routeProvider.when('/addPrefeito', {
            templateUrl: 'partials/administracao/prefeito/add-prefeito.html',
            controller: 'addPrefeitoController'
        });
        $routeProvider.when('/editPrefeito', {
            templateUrl: 'partials/administracao/prefeito/edit-prefeito.html'
        });
    
        /* TIPO ITEM */
        $routeProvider.when('/tipoDoItem', {
            templateUrl: 'partials/administracao/tipoItem/visu-tipo-item.html'
        });
        $routeProvider.when('/addTipoDoItem', {
            templateUrl: 'partials/administracao/tipoItem/add-tipo-item.html',
            controller: 'addtipoDoItemController'
        });
        $routeProvider.when('/editTipoDoItem', {
            templateUrl: 'partials/administracao/tipoItem/edit-tipo-item.html'
        });
    
        /* TIPOLOGIA */
        $routeProvider.when('/tipologia', {
            templateUrl: 'partials/administracao/tipologia/visu-tipologia.html'
        });
        $routeProvider.when('/addTipologia', {
            templateUrl: 'partials/administracao/tipologia/add-tipologia.html',
            controller: 'addTipologiaController',
        });
        $routeProvider.when('/editTipologia/:tipologiaID', {
            templateUrl: 'partials/administracao/tipologia/edit-tipologia.html',
            controller: 'editTipologiaController'
        });
    
        /* MODULO USUARIO */
        $routeProvider.when('/perfilUsuario', {
            templateUrl: 'partials/administracao/modulo/visu-modulo-usuario.html'
        });
        $routeProvider.when('/addPerfilUsuario', {
            templateUrl: 'partials/administracao/modulo/add-modulo-usuario.html',
            controller: 'addUsuarioController',
        });
        $routeProvider.when('/editPerfilUsuario', {
            templateUrl: 'partials/administracao/modulo/edit-modulo-usuario.html'
        });
    
        /* PREVISAO EMPENHO */
        $routeProvider.when('/previsaoEmpenho', {
            templateUrl: 'partials/fiscalizacao/previsaoEmpenho/visu-previsao-empenho.html',
            controller: 'visuPrevEmpController'
        });
        $routeProvider.when('/editPrevisaoEmpenho/:previsaoEmpenhoID', {
            templateUrl: 'partials/fiscalizacao/previsaoEmpenho/edit-previsao-empenho.html',
            controller: 'editPrevisaoEmpenhoController'
        });
        $routeProvider.when('/addPrevisaoEmpenho', {
            templateUrl: 'partials/fiscalizacao/previsaoEmpenho/add-previsao-empenho.html'
        });

        $routeProvider.when('/Erro404', {
            templateUrl: 'partials/404.ejs'
        });

        $routeProvider.otherwise({
            redirectTo: '/Erro404'
        });
    });
   /*  .filter('startFrom',function(){
        return function(data,start){
            return data.slice(start);
        }
    }); */