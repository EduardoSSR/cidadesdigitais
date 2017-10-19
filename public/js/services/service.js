(function () {
    'use strict';
    
    
    
    angular.module('cidadesdigitais').service('InjecaoInfo', InjecaoInfo); //Define o nome a função do seu .service

    InjecaoInfo.$inject = ['$http']; //Lista de dependências
    
    function InjecaoInfo($http, $routeParams) {

        var vm = this;

        vm.getContato = getContato; 
        vm.getCds = getCds; 
        vm.getEntidade = getEntidade;
        vm.getEntidadeId = getEntidadeId;
        vm.deleteCd = deleteCd;
        vm.postContato = postContato;
        vm.putContato = putContato;
        vm.postEntidade = postEntidade;
        vm.getVisuPonto = getVisuPonto;
        vm.getEditPonto = getEditPonto;
        vm.getEmpenho = getEmpenho;
        vm.getNaturesaDespesa = getNaturesaDespesa;
        vm.getPrevisaoEmpenho = getPrevisaoEmpenho;
        vm.getCarregaPrevEmpenho = getCarregaPrevEmpenho;
        vm.getcdCodIbge = getcdCodIbge;
        vm.getAcompanhamentos = getAcompanhamentos;
        vm.getProcessos = getProcessos;
        vm.submeterProcesso = submeterProcesso;
        vm.addProcesso = addProcesso;
        vm.getAssuntos = getAssuntos;
        vm.postAssunto = postAssunto;
        vm.formatJsonPonto = formatJsonPonto;
        vm.formatJsonPonto = formatJsonPonto;
        vm.getLote = getLote;
//        vm.getCdItens = getCdItens;
        vm.getEstado = getEstado;
        vm.getMunicipio = getMunicipio;
        
        
         function getEmpenho(empenhoId){
            return $http.get('read/empenho'); 
        }
        
//          function getCdItens(){
//            return $http.get('read/cdIten'); 
//        }
        
        function getLote(){
            return $http.get('read/lotes'); 
        }
        
        function getNaturesaDespesa(){
            return $http.get('read/naturesaDespesa'); 
        }
        
        function getPrevisaoEmpenho(){
            return $http.get('read/previsaoEmpenho'); 
        }
        function getCarregaPrevEmpenho(value){
            return $http.get('read/previsaoEmpenho/' + value); 
        }
        
        
        
        function getcdCodIbge(cdCodIbge){
            return $http.get('/read/cd/' + cdCodIbge); 
        }
        
        function getCds(){
            return $http.get('/read/cd'); 
        }
        
        
        //Implementação de injeção de contato
        function getContato() {
            return $http.get('read/contato');
        }
        
        function getEntidade(){
            return $http.get('read/entidades');
        }
        
        function getEntidadeId(entidadeId){
            return $http.get('read/entidades/' + entidadeId);
        }
        
        function deleteCd(cdCodIbge){
            return $http.delete('/read/cd/' + cdCodIbge);
        } 
        
        function postContato(contato){
            return $http.post('read/contato', contato);
        }
        
        function putContato(contato){
            return $http.put('read/contato', contato);
        }
        
        function postEntidade(entidade){
            return $http.post('read/entidades', entidade);
        }
        
        
        function getAcompanhamentos(){
            return $http.get('read/acompanhamento');
        }
        
        function getProcessos(){
            return $http.get('/read/processo');
        }

        function submeterProcesso(processos){
            return $http.post('/read/cd', processos);
        }
        
        function addProcesso(processo){
            return $http.post('read/processo', processo);
        }
        
        function getAssuntos(){
            return $http.get('read/assunto');
        }
        
        function postAssunto(acompanhamento){
            return $http.post('read/acompanhamento', acompanhamento);
        }
        
        function getEstado(){
            return $http.get('/read/cd/estado');
        }
        
        function getMunicipio(uf){
            return $http.get('/read/cd/municipio/' + uf);
        }

      /*  Metodos http da categoria ponto*/
        function getVisuPonto(){
            return $http.get('read/ponto');
        }
        
        function getEditPonto(ponto){
            return $http.get('read/ponto/' + ponto.cod_ponto  + '/' +   ponto.categoria_cod_categoria  + '/' + ponto.cd_municipio_cod_ibge);
        }
        
        function formatJsonPonto(pontoTip){
            var ponto = [];
            for(var z = 0; z < pontoTip.length; z++){
                ponto[z] = {
                    cod_ponto: pontoTip[z].cod_ponto,
                    categoria_cod_categoria: pontoTip[z].categoria_cod_categoria,
                    cd_municipio_cod_ibge: pontoTip[z].cd_municipio_cod_ibge,
                    nome: pontoTip[z].nome,
                    endereco: pontoTip[z].endereco,
                    numero: pontoTip[z].numero,
                    complemento: pontoTip[z].complemento,
                    bairro: pontoTip[z].bairro,
                    cep: pontoTip[z].cep,
                    latitude: pontoTip[z].latitude,
                    longitude: pontoTip[z].longitude,
                    tipologias: [{
                        cod_tipologia: pontoTip[z].cod_tipologia,
                        descricao: pontoTip[z].descricao
                                }]
                            }
            };
           var pontoCd = [ponto[0]];
            for(var x = 0; x < ponto.length - 1; x++){
                if(ponto[x+1].cd_municipio_cod_ibge == pontoCd[pontoCd.length - 1].cd_municipio_cod_ibge && ponto[x+1].categoria_cod_categoria == pontoCd[pontoCd.length - 1].categoria_cod_categoria && ponto[x+1].cod_ponto == pontoCd[pontoCd.length - 1].cod_ponto){
                    pontoCd[pontoCd.length-1].tipologias[pontoCd[pontoCd.length-1].tipologias.length] = ponto[x+1].tipologias[ponto[x+1].tipologias.length-1];
                }else{
                    pontoCd[pontoCd.length] = ponto[x+1];
                }
            }
            return pontoCd;
        }
    }
})();


//