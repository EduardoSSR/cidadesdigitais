angular.module('meusServicos', ['ngResource'])
	.factory('recursoEntidade', function ($resource) {
		return $resource('read/entidades/:entidadeId', null, {
			'update': {
				method: 'PUT'
			}
		});
	}).factory("cadastroDeEntidade", function (recursoEntidade, $q) {
		var service = {};
		service.cadastrar = function (entidade) {
			return $q(function (resolve, reject) {
				if (entidade.cnpj) {
					recursoEntidade.update({
						entidadeId: entidade.cnpj
					}, entidade, function () {
						resolve({
							mensagem: "<strong>Cadastrado!</strong><br>" + entidade.nome + " foi atualizado(a) com sucesso.",
							inclusao: false
						});
					}, function (erro) {
						console.log(erro);
						reject({
							mensagem: "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao cadastrar o(a) </p>" + entidade.nome + ", tente novamente mais tarde."
						});
					});

				} else {
					recursoEntidade.save(entidade, function () {
						resolve({
							mensagem: "<strong>Cadastrado!</strong><br>" + entidade.nome + " foi cadastrado(a) com sucesso.",
							inclusao: true
						});
					}, function (erro) {
						reject({
							mensagem: "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao cadastrar o(a) </p>" + entidade.nome + ", tente novamente mais tarde."
						});
					});
				}
			});
		};
		return service;
	})
	/* -------------------------------------  Recursos de LOTE ------------------------------------------*/
	.factory('recursoLote', function ($resource) {
		return $resource('read/lotes/:loteId', null, {
			'update': {
				method: 'PUT'
			}
		});
	}).factory("cadastroDeLote", function (recursoLote, $q) {
		var service = {};
		service.cadastrar = function (lote) {
			return $q(function (resolve, reject) {

				if (lote.cod_lote) {
					recursoLote.update({
						loteId: lote.cod_lote
					}, lote, function () {
						resolve({
							mensagem: "<strong>Cadastrado!</strong><br>" + lote.cod_lote + " foi atualizado(a) com sucesso.",
							inclusao: false
						});
					}, function (erro) {
						console.log(erro);
						reject({
							mensagem: "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao cadastrar o(a) </p>" + lote.cod_lote + ", tente novamente mais tarde."
						});
					});

				} else {
					recursoLote.save(lote, function () {
						resolve({
							mensagem: "<strong>Cadastrado!</strong><br>" + lote.cod_lote + " foi cadastrado(a) com sucesso.",
							inclusao: true
						});
					}, function (erro) {
						reject({
							mensagem: "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao cadastrar o(a) </p>" + lote.nome + ", tente novamente mais tarde."
						});
					});
				}
			});
		};
		return service;
	})
	/* -------------------------------------  Recursos de CONTATO ------------------------------------------*/
	.factory('recursoContato', function ($resource) {
		return $resource('read/contato/:contatoId', null, {
			'update': {
				method: 'PUT'
			}
		});
	}).factory("cadastroDeContato", function (recursoContato, $q) {
		var service = {};
		service.cadastrar = function (contato) {
			return $q(function (resolve, reject) {
				if (contato.cod_contato) {
					recursoContato.update({
						contatoId: contato.cod_contato
					}, contato, function () {
						resolve({
							mensagem: "<strong>Cadastrado!</strong><br>" + contato.cod_contato + " foi atualizado(a) com sucesso.",
							inclusao: false
						});
					}, function (erro) {
						console.log(erro);
						reject({
							mensagem: "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao cadastrar o(a) </p>" + contato.cod_contato + ", tente novamente mais tarde."
						});
					});

				} else {
					recursoContato.save(contato, function () {
						resolve({
							mensagem: "<strong>Cadastrado!</strong><br>" + contato.cod_contato + " foi cadastrado(a) com sucesso.",
							inclusao: true
						});
					}, function (erro) {
						reject({
							mensagem: "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao cadastrar o(a) </p>" + contato.nome + ", tente novamente mais tarde."
						});
					});
				}
			});
		};
		return service;
	})
	/* -------------------------------------  Recursos de CD ------------------------------------------*/
	.factory('recursoCidadeDigital', function ($resource) {
		return $resource('/read/cd', null, {
			'update': {
				method: 'PUT'
			}
		})
	}).factory("cadastroCD", function (recursoCD, $q) {
		var service = {};
		service.cadastrar = function (contato) {
			return $q(function (resolve, reject) {
				if (contato.cod_contato) {
					recursoCD.update({
						contatoId: contato.cod_contato
					}, contato, function () {
						resolve({
							mensagem: "<strong>Cadastrado!</strong><br>" + contato.cod_contato + " foi atualizado(a) com sucesso.",
							inclusao: false
						});
					}, function (erro) {
						console.log(erro);
						reject({
							mensagem: "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao cadastrar o(a) </p>" + contato.cod_contato + ", tente novamente mais tarde."
						});
					});

				} else {
					recursoCD.save(contato, function () {
						resolve({
							mensagem: "<strong>Cadastrado!</strong><br>" + contato.cod_contato + " foi cadastrado(a) com sucesso.",
							inclusao: true
						});
					}, function (erro) {
						reject({
							mensagem: "<strong>" + erro + "!</strong><br><p>Ocorreu um erro ao cadastrar o(a) </p>" + contato.nome + ", tente novamente mais tarde."
						});
					});
				}
			});
		};
		return service;
	});
	