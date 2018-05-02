angular.module('cidadesdigitais')
    .filter('tel', function() {
  return function(input) {
  	var str = input+ '';
        str = str.replace(/\D/g,'');
        if(str.length === 11 ){
        str=str.replace(/^(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
    	}else{
    	str=str.replace(/^(\d{2})(\d{4})(\d{4})/,'($1) $2-$3');
    	}
    return str;
  };
    
}).filter('quantidadeValor', function(){
    return function(quantidade, valor){
        if(quantidade == '') quantidade = '0';
        return (quantidade * valor);
    }
}).filter('processoFilter', function() {
  return function(input) {
  	 var parte1 = input.substring(0,5)
  	 var parte2 = input.substring(5,10)
  	 var parte3 = input.substring(10,14)
  	 var parte4 = input.substring(14,16)
     
     var processo = parte1 + "." + parte2 + "/" + parte3 + "-" + parte4   
     return processo;
  };
    
}).filter('cnpj', function() {
    return function(input) {
        // regex créditos Matheus Biagini de Lima Dias
        var str = input+ '';
          str=str.replace(/\D/g,'');
          str=str.replace(/^(\d{2})(\d)/,'$1.$2');
          str=str.replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3');
          str=str.replace(/\.(\d{3})(\d)/,'.$1/$2');
          str=str.replace(/(\d{4})(\d)/,'$1-$2');
      return str;
    };
  });

  





