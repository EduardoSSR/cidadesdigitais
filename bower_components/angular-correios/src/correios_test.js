describe('angular-correios', function () {
	var Correios, $httpBackend;
	beforeEach(module('angular-correios'));
	beforeEach(inject(function (_Correios_, _$httpBackend_) {
		Correios = _Correios_;
		$httpBackend = _$httpBackend_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should get a postal code', function () {
		$httpBackend.expectGET('//viacep.com.br/ws/02011200/json').respond({
			cep: "02011-200",
			logradouro: "Rua Voluntários da Pátria",
			complemento: "de 1413 a 1541 - lado ímpar",
			bairro: "Santana",
			localidade: "São Paulo",
			uf: "SP",
			ibge: "3550308"
		});

		Correios.get('02011200').then(function (postalCode) {
			assert.equal('02011-200', postalCode.cep);
			assert.equal('SP', postalCode.uf);
			assert.equal('3550308', postalCode.ibge);
		});

		$httpBackend.flush();
	});
});