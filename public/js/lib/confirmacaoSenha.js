function validarSenha(){
   NovaSenha = document.getElementById('senha').value;
   CNovaSenha = document.getElementById('senhac').value;
   if (NovaSenha != CNovaSenha) {
       alert("Senhas não coincidem!");
      return false; 
   }else{
      return true;
   }
}