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
        
        if(valor == ''){
            valor = '0'
        }
        if(quantidade == ''){
            quantidade = '0'
        }
        
        for(var i = 0; i < 4; i++){
        valor = valor.toString().replace("." ,"")
            }
        valor = valor.toString().replace("," ,"")
        if(valor.length > 2){
        
            var parte1 = valor.substring(0, valor.length - 2)
            var parte2 = valor.substring(valor.length - 2, valor.length)
          
            valor = parte1 + "." + parte2
         
        }
      
        var total = quantidade * parseFloat(valor);
        var arruma = total.toFixed(2)
        return total
    
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
    
});

  





