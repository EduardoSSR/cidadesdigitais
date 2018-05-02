angular.module('minhasDiretivas', [])

    .directive('cabecalhoTelaInicial', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/cabecalho-tela-inicial.html';

        return ddo;
    }).directive('cabecalhoTelaLogin', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/cabecalho-tela-login.html';

        return ddo;
    }).directive('submenuAddContatos', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/submenu-add-contatos.html';

        return ddo;
    }).directive('addPonto', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/add-ponto.html';

        return ddo;
    }).directive('editarPonto', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/editar-ponto.html';

        return ddo;
    }).directive('editarItens', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/editar-itens.html';

        return ddo;
    }).directive('editarEmpenho', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/editar-empenho.html';

        return ddo;
    }).directive('editarContato', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/editar-contato.html';

        return ddo;
    }).directive('editarProcesso', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/editar-processo.html';

        return ddo;
    }).directive('addProcesso', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/add-processo.html';

        return ddo;
    }).directive('editarAcompanhamento', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/editar-acompanhamento.html';

        return ddo;
    }).directive('novoMenu', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/novo-menu.html';

        return ddo;
    }).directive('dropdownUsuario', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/dropdown-usuario.html';

        return ddo;
    }).directive('editarItensLotes', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/editar-itens-lotes.html';

        return ddo;
    }).directive('editarReajusteLotes', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/editar-reajuste-lotes.html';

        return ddo;
    }).directive('editarFaturaPagamento', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/editar-fatura-pagamento.html';

        return ddo;
    }).directive('editarEntidade', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/editar-entidade.html';

        return ddo;
    }).directive('rodape', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/rodape.html';

        return ddo;
    }).directive('addAcompanhamento', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/add-acompanhamento.html';

        return ddo;
    });
