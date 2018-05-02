function createEndpoint (endpoint, postalCode) {
	return endpoint.replace(/\{POSTAL_CODE\}/g, postalCode);
}

function CorreiosProvider (){
	var defaults 	= this.defaults = {
		endpoint: '//viacep.com.br/ws/{POSTAL_CODE}/json'
	};

	this.$get = CorreiosFactory;

	function CorreiosFactory ($http) {
		return {
			endpoint: function (postalCode) {
				return this.createEndpoint(defaults.endpoint, postalCode);
			},
			transformResponse: function (res) {
				return res.data;
			},
			createEndpoint: createEndpoint,
			get: function (postalCode) {
				return $http.get(this.endpoint(postalCode)).then(this.transformResponse);
			}
		};
	}
}

angular.module('angular-correios', [])
.provider('Correios', CorreiosProvider);
