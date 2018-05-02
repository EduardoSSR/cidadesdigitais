# angular-correios

Módulo para AngularJS que te ajudará a manipular a API dos Correios.

### Installation
```
bower install --save angular-correios
```

### Usage

The `{POSTAL_CODE}` in the `endpoint` property will be replaced with the postal code passed on the `get()` method of `Correios` service.

```js
angular.module('app', ['angular-correios'])
.config(function (CorreiosProvider) {
	CorreiosProvider.defaults.endpoint = '/my.new.correios.api/{POSTAL_CODE}/json';
})
.controller('MyApp', function () {
	$scope.ourPostalCode = false;

	Correios.get('02011200').then(function (data) {
		$scope.ourPostalCode = data.cep;
	});
});
```