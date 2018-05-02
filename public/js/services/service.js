(function () {
    'use strict';
    angular.module('cidadesdigitais').service('InjecaoInfo', InjecaoInfo); //Define o nome a função do seu .service
    InjecaoInfo.$inject = ['$http']; //Lista de dependências
    function InjecaoInfo($http, $stateParams) {
        var vm = this;

        /*===================== USUARIO  ====================*/
        vm.getUsuario = getUsuario;
        vm.getUsuarioModulos = getUsuarioModulos;
        vm.postUsuario = postUsuario;
        vm.getUserById = getUserById;
        vm.getModulos = getModulos;
        vm.getModulos2 = getModulos2;



        /*===================== PREVISAO EMPENHO  ====================*/
        vm.getPrevisaoEmpenho = getPrevisaoEmpenho;
        vm.getPrevisaoEmpenhoByCodLote = getPrevisaoEmpenhoByCodLote;
        vm.postPrevEmpenho = postPrevEmpenho;
        vm.putPrevEmpenho = putPrevEmpenho;
        vm.getPrevEmpById = getPrevEmpById;
        vm.deletePrevEmpenho = deletePrevEmpenho;
        vm.getPrevisaoEmpenhoItens = getPrevisaoEmpenhoItens;
        vm.putPrevisaoEmpenhoItens = putPrevisaoEmpenhoItens;
        vm.getQuantidadeDisp = getQuantidadeDisp;

        /*===================== EMPENHO  ====================*/

        vm.getEmpenhos = getEmpenhos;
        vm.getEmpenhosByCodLote = getEmpenhosByCodLote;
        vm.getEmpenhoById = getEmpenhoById;
        vm.postEmpenho = postEmpenho;
        vm.putEmpenho = putEmpenho;
        vm.putItensEmpenho = putItensEmpenho;

        /*===================== EMPENHO ITENS  ====================*/

        vm.getEmpenhoItensById = getEmpenhoItensById;
        vm.postEmpenhoItens = postEmpenhoItens;
        //vm.putEmpenhoItens = putEmpenhoItens;
        //vm.deleteEmpenhoItens = deleteEmpenhoItens;

        /*===================== NATUREZA DESPESA  ====================*/

        vm.getNaturezaDespesa = getNaturezaDespesa;
        vm.getNaturezaDespesaId = getNaturezaDespesaId;
        vm.deleteNaturezaDespesa = deleteNaturezaDespesa;


        /*===================== Fatura  ====================*/
        vm.getFatura = getFatura;
        vm.getCdFaturaByCodIbge = getCdFaturaByCodIbge;
        vm.getFaturaEdit = getFaturaEdit;
        vm.getPagamentosFatura = getPagamentosFatura;
        vm.postFatura = postFatura;
        vm.EnviarItem = EnviarItem;
        vm.getItensFatura = getItensFatura;
        vm.postItensFatura = postItensFatura;
        vm.delFatura = delFatura;
        vm.delItemFatura = delItemFatura;
        vm.alterItemFatura = alterItemFatura;
        vm.getFaturaTotal = getFaturaTotal;

        /*===================== CATEGORIA  ====================*/
        vm.getCategoria = getCategoria;
        vm.postCategoria = postCategoria;
        vm.putCategoria = putCategoria;
        vm.deleteCategoria = deleteCategoria;
        vm.getCategoriaById = getCategoriaById;

        /*===================== ITENS  ====================*/
        vm.getItem = getItem;
        vm.getCdItens = getCdItens;

        /*===================== REAJUSTE  ====================*/
        vm.getReajuste = getReajuste;
        vm.postReajuste = postReajuste;
        vm.deleteReajuste = deleteReajuste;


        /*===================== CONTATOS  ====================*/
        vm.getContato = getContato;
        vm.getContatoByCodIbge = getContatoByCodIbge;
        vm.postContato = postContato;
        vm.putContato = putContato;
        vm.deleteContato = deleteContato;

        /*===================== PAGAMENTO  ====================*/

        vm.getPagamentoById = getPagamentoById;
        vm.postPagamento = postPagamento;
        vm.getFaturaByOtbId = getFaturaByOtbId;
        vm.putPagamento = putPagamento;
        vm.putArrayItensPagamento = putArrayItensPagamento;
        vm.getFaturaByCodIbge = getFaturaByCodIbge;
        vm.getItensPagamento = getItensPagamento;
        vm.postFaturaPag = postFaturaPag;
        vm.getPagamentoIbge = getPagamentoIbge;

        /*=====================    CD  ====================*/
        
        // vm.getCds = getCds;
        vm.getGlosa = getGlosa;
        vm.deleteCd = deleteCd;
        vm.postPonto = postPonto;
        vm.putPonto = putPonto;
        vm.getVisuPonto = getVisuPonto;
        vm.getPontoById = getPontoById;
        vm.getEditPonto = getEditPonto;
        vm.delPonto = delPonto;
        vm.formatJsonPonto = formatJsonPonto;
        vm.getEditUacom = getEditUacom;
        vm.getAcompanhamentosById = getAcompanhamentosById;
        vm.getcdCodIbge = getcdCodIbge;
        vm.getAcompanhamentos = getAcompanhamentos;
        vm.getProcessos = getProcessos;
        vm.getProcessoById = getProcessoById;
        vm.editarProcesso = editarProcesso;
        vm.addProcesso = addProcesso;
        vm.removerProcesso = removerProcesso;

        /*===================== ASSUNTO  ====================*/

        vm.postUacomAssunto = postUacomAssunto;
        vm.getAssuntos = getAssuntos;
        vm.postAssuntos = postAssuntos;
        vm.deleteAssuntoById = deleteAssuntoById;
        vm.putAssuntoById = putAssuntoById;
        vm.postAssunto = postAssunto;
        vm.getAssuntoById = getAssuntoById;


        vm.getEstado = getEstado;
        vm.getMunicipio = getMunicipio;
        vm.getTelefone = getTelefone;
        vm.postTelefone = postTelefone;
        vm.putTelefone = putTelefone;
        vm.deleteTelefone = deleteTelefone;

        vm.delTipo = delTipo;

        /*================TIPOLOGIA ==============*/
        vm.getTipologiaId = getTipologiaId;
        vm.getTipologia = getTipologia;
        vm.deleteTipologiaId = deleteTipologiaId;

        vm.getClasse = getClasse;
        vm.postClasse = postClasse;
        vm.getClasseById = getClasseById;
        vm.putClasse = putClasse;
        vm.deleteClasse = deleteClasse;


        vm.permissaoAcesso = permissaoAcesso;

        /* ====================== PREFEITO  ===================*/

        /*  vm.getPrefeito = getPrefeito;*/

        /*===================== USUARIOS  ====================*/

        function getUsuario() {
            return $http.get('read/usuario');
        }

        function getUsuarioModulos(id) {
            return $http.get('read/usuario/' + id + '/modulos');
        }

        function postUsuario(usuario) {
            return $http.post('read/usuario', usuario);
        }

        function getUserById(codUser) {
            return $http.get('read/usuario/' + codUser);
        }

        function getModulos() {
            return $http.get('read/modulo');
        }

        function getModulos2() {
            return $http.get('read/modulo2');
        }

       
        /*===================== PREVISAO EMPENHO  ====================*/

        function postPrevEmpenho(prevEmpenho) {
            return $http.post('read/previsaoEmpenho', prevEmpenho);
        }

        function getPrevisaoEmpenho() {
            return $http.get('read/previsaoEmpenho');
        }
        
        function getPrevisaoEmpenhoByCodLote(codLote) {
            return $http.get('read/previsaoEmpenho/cd/' + codLote);
        }

        function getPrevEmpById(prevEmpenhoId) {
            return $http.get('read/previsaoEmpenho/' + prevEmpenhoId);
        }

        function deletePrevEmpenho(codPrevEmpenho) {
            return $http.delete('read/previsaoEmpenho/' + codPrevEmpenho);
        }

        function getPrevisaoEmpenhoItens(codLote ,previsaoEmpenhoId) {
            return $http.get('read/previsaoEmpenhoItens/' + codLote + '/' + previsaoEmpenhoId);
        }

        function putPrevisaoEmpenhoItens(previsaoEmpenhoItens) {
            return $http.put('read/previsaoEmpenhoItens', previsaoEmpenhoItens);
        }

        function getQuantidadeDisp(loteId) {
            return $http.put('read/previsaoEmpenhoItens', loteId);
        }

        function putPrevEmpenho(prevEditEmpenho) {
            return $http.put('read/previsaoEmpenho', prevEditEmpenho);
        }

        /*===================== EMPENHO  ====================*/

        function getEmpenhos() {
            return $http.get('read/empenho');
        }
        
        function getEmpenhosByCodLote(codLote) {
            return $http.get('read/empenho/cd/' + codLote);
        }

        function getEmpenhoById(empenhoId) {
            return $http.get('read/empenho/' + empenhoId);
        }

        function postEmpenho(dados) {
            return $http.post('read/empenho/', dados);
        }

        function putEmpenho(empenhos) {
            return $http.put('read/empenho', empenhos);
        }


        /*===================== EMPENHO ITENS ====================*/

        function getEmpenhoItensById(empenhoId,codLote) {
            return $http.get('read/empenhoItens/' + empenhoId + '/' + codLote)
        }

        function postEmpenhoItens(empenhoItensId) {
            return $http.post('read/empenhoItens/' + empenhoItensId);
        }

        function putItensEmpenho(empenhoItensArray) {
            return $http.put('/read/empenhoItens', empenhoItensArray);
        }



        /*===================== NATUREZA DESPESA  ====================*/

        function getNaturezaDespesa() {
            return $http.get('read/naturezaDespesa');
        }

        function getNaturezaDespesaId(natDespId) {
            return $http.get('read/naturezaDespesa/' + natDespId);
        }

        function deleteNaturezaDespesa(natDespId) {
            return $http.delete('read/naturezaDespesa/' + natDespId);
        }


        /*===================== ITENS  ====================*/

        function getCdItens(codIbge) {
            return $http.get('read/cdItens/' + codIbge);
        }

        /*===================== REAJUSTE  ====================*/

        function getReajuste() {
            return $http.get("read/reajuste");
        }

        function postReajuste(reajuste) {
            return $http.post('read/reajuste', reajuste);
        }

        function deleteReajuste(loteId, anoRef) {
            return $http.delete('read/reajuste/' + loteId + '/' + anoRef);
        }

        
        /*===================== CD  ====================*/
        
        function getcdCodIbge(cdCodIbge) {
            return $http.get('/read/cd/' + cdCodIbge);
        }

        // function getCds() {
        //     return $http.get('/read/cd');
        // }

        function getGlosa(codIbge) {
            return $http.get('/read/glosa/' + codIbge);
        }


        function deleteCd(cdCodIbge) {
            return $http.delete('/read/cd/' + cdCodIbge);
        }

        /*===================== TELEFONE  ====================*/
        function getTelefone() {
            return $http.get('/read/telefone');
        }

        function postTelefone(dado) {
            return $http.post('read/telefone', dado);
        }

        function putTelefone(dado) {
            return $http.put('read/telefone', dado);
        }

        function deleteTelefone(dado) {
            return $http.delete('read/telefone/' + dado);
        }

        /*===================== CONTATOS  ====================*/
        function getContato(entidadeId) {
            return $http.get('read/contato/entidade/' + entidadeId);
        }
        
        function getContatoByCodIbge(codIbge) {
            return $http.get('read/contato/cd/' + codIbge);
        }

        function postContato(dados) {
            return $http.post('read/contato', dados);
        }

        function putContato(dados) {
            return $http.put('read/contato', dados);
        }

        function deleteContato(dados) {
            return $http.delete('read/contato/' + dados);
        }

        /*===================== FATURA  ====================*/
        function getFatura() {
            return $http.get('read/fatura');
        }
        
        function getCdFaturaByCodIbge(codIbge) {
            return $http.get('read/fatura/cd/' + codIbge);
        }

        function getFaturaTotal(faturaId) {
            return $http.get('read/totalFatura/' + faturaId);
        }

        function getFaturaEdit(faturaId, cod_ibge) {
            return $http.get('read/fatura/' + faturaId + '/' + cod_ibge);
        }

        function getPagamentosFatura(numFatura, codIbge) {
            return $http.get('read/faturaOtb/' + numFatura + '/' + codIbge);
        }

        function getItem() {
            return $http.get('/read/itens');
        }

        function postFatura(faturas) {
            return $http.post('read/fatura', faturas);
        }

        function delFatura(fatura) {
            return $http.delete('read/fatura/' + fatura.num_nf);
        }

        function getItensFatura(faturaId, codIbge) {
            return $http.get('/read/faturaItens/' + faturaId + '/' + codIbge);
        }

        function postItensFatura(faturas) {
            return $http.post('read/faturaItens', faturas);
        }

        function alterItemFatura(faturas) {
            return $http.put('read/faturaItens', faturas);
        }


        function delItemFatura(itemFatura, codIbge) {
            return $http.delete('read/faturaItens/' + itemFatura.fatura_num_nf + '/' + itemFatura.cod_empenho + '/' + itemFatura.cod_item + '/' + itemFatura.tipo_item_cod_tipo_item + '/' + codIbge);
        }


        function EnviarItem(item, faturas) {
            return $http.get('read/faturaItens/' + faturas.cd_municipio_cod_ibge + '/' + item.natureza_despesa_cod_natureza_despesa + '/' + item.cod_item + '/' + item.tipo_item_cod_tipo_item);
        }

        /*====================== Categoria ========================*/


        function getCategoria(dados) {
            return $http.get('/read/categoria');
        }

        function postCategoria(dados) {
            return $http.post('/read/categoria', dados);
        }

        function putCategoria(categoria) {
            return $http.put('/read/categoria', categoria);
        }

        function deleteCategoria(dados) {
            return $http.delete('/read/categoria', dados);
        }

        function getCategoriaById(idCategoria) {
            return $http.get('read/categoria/' + idCategoria);
        }

        /*======================================================*/

        function getAcompanhamentos(codIbge) {
            return $http.get('read/acompanhamento/' + codIbge);
        }
        /*===================== PROCESSOS =======================*/
        function getProcessos(codIbge) {
            return $http.get('read/processo/' + codIbge);
        }

        function getProcessoById(codProcesso, codIbge) {
            return $http.get('read/processo/' + codProcesso + '/' + codIbge)
        }

        function editarProcesso(processo) {
            return $http.put('/read/processo', processo);
        }

        function addProcesso(processo) {
            return $http.post('read/processo', processo);
        }

        function removerProcesso(codProcesso, codIbge) {
            return $http.delete('/read/processo/' + codProcesso + '/' + codIbge);
        }
        /*===================== ASSUNTO =======================*/
        function getAssuntos() {
            return $http.get('read/assunto');
        }

        function postAssuntos(assunto) {
            return $http.post('read/assunto', assunto);
        }

        function putAssuntoById(idAssunto, assunto) {
            return $http.put('read/assunto/' + idAssunto, assunto);
        }

        function deleteAssuntoById(idAssunto) {
            return $http.delete('read/assunto/' + idAssunto);
        }

        function getAssuntoById(idAssunto) {
            return $http.get('read/assunto/' + idAssunto);
        }

        function postAssunto(acompanhamento) {
            return $http.post('read/acompanhamento', acompanhamento);
        }

        function postUacomAssunto(acompanhamento) {
            return $http.post('read/uacomAssunto', acompanhamento);
        }

        /*===================== PAGAMENTO =======================*/

        function getPagamentoById(pagamentoId) {
            return $http.get('read/otb/' + pagamentoId);
        }

        function getPagamentoIbge(codIbge) {
            return $http.get('read/otbCD/' + codIbge);
        }

        function postPagamento(pagamento) {
            return $http.post('read/otb', pagamento);
        }

        function putPagamento(pagamento) {
            return $http.put('read/otb', pagamento);
        }
        function putArrayItensPagamento(pagamento) {
            return $http.put('read/otbItens', pagamento);
        }

        function getFaturaByOtbId(otbId) {
            return $http.get('/read/otbFatura/' + otbId);
        }

        function postFaturaPag(fatPag) {
            return $http.post('read/otbFat', fatPag);
        }

        function getItensPagamento(otbId) {
            return $http.get('read/otbItens/' + otbId);
        }

        function getFaturaByCodIbge(codIbge) {
            return $http.get('read/otbMuniFatura/' + codIbge);
        }

        /*====================Classe =====================*/

        function getClasse() {
            return $http.get('read/classeEmpenho');
        }

        function getClasseById(classeEmpenhoId) {
            return $http.get('read/classeEmpenho/' + classeEmpenhoId)
        }


        function postClasse(classeEmpenho) {
            return $http.post('read/classeEmpenho', classeEmpenho);
        }

        function putClasse(classeEmpenho) {
            return $http.put('read/classeEmpenho', classeEmpenho);
        }

        function deleteClasse(classeEmpenhoId) {
            return $http.delete('read/classeEmpenho/' + classeEmpenhoId);
        }


        /*=====================  =======================*/

        function getEstado() {
            return $http.get('/read/cd/estado');
        }

        function getMunicipio(uf) {
            return $http.get('/read/cd/municipio/' + uf);
        }


        /*=========================== CATEGORIA ===================================*/

        function getCategoria() {
            return $http.get('/read/categoria/');
        }

        /*==============================  =======================================*/

        /*=========================== TIPOLOGIA ==================================*/

        function getTipologia() {
            return $http.get('/read/tipologia/');
        }

        function getTipologiaId(tipologiaId) {
            return $http.get('/read/tipologia/' + tipologiaId);
        }

        function deleteTipologiaId(tipologiaId) {
            return $http.delete('/read/tipologia/' + tipologiaId);
        }

        /*==============================  =======================================*/


        /*=========================== PONTO =====================================*/
        function getVisuPonto(codIbge) {
            return $http.get('read/ponto/' + codIbge);
        }

        function getPontoById(codPonto, codCategoria, codIbge) {
            return $http.get('read/ponto/' + codPonto + '/' + codCategoria + '/' + codIbge);
        }

        function postPonto(pontoCds) {
            return $http.post('read/ponto', pontoCds);
        }

        function putPonto(editPonto) {
            return $http.put('read/ponto', editPonto)
        }

        function getEditPonto(ponto) {
            return $http.get('read/ponto/' + ponto.cod_ponto + '/' + ponto.categoria_cod_categoria + '/' + ponto.cd_municipio_cod_ibge);
        }

        function delPonto(ponto) {
            return $http.delete('read/ponto/' + ponto.cod_ponto + '/' + ponto.categoria_cod_categoria + '/' + ponto.cd_municipio_cod_ibge);
        }

        function delTipo(mTipologia, editPontos) {
            return $http.delete('read/pontoTipologia/' + editPontos.cod_ponto + '/' + editPontos.categoria_cod_categoria + '/' + editPontos.cd_municipio_cod_ibge + '/' + mTipologia.cod_tipologia);
        }

        function formatJsonPonto(pontoTip) {
            var ponto = [];
            for (var z = 0; z < pontoTip.length; z++) {
                ponto[z] = {
                    cod_ponto: pontoTip[z].cod_ponto,
                    categoria_cod_categoria: pontoTip[z].categoria_cod_categoria,
                    cd_municipio_cod_ibge: pontoTip[z].cd_municipio_cod_ibge,
                    nome: pontoTip[z].nome,
                    categoria_descricao: pontoTip[z].categoria_descricao,
                    endereco: pontoTip[z].endereco,
                    numero: pontoTip[z].numero,
                    complemento: pontoTip[z].complemento,
                    bairro: pontoTip[z].bairro,
                    descricao_categoria: pontoTip[z].descricao_categoria,
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
            for (var x = 0; x < ponto.length - 1; x++) {
                if (ponto[x + 1].cd_municipio_cod_ibge == pontoCd[pontoCd.length - 1].cd_municipio_cod_ibge && ponto[x + 1].categoria_cod_categoria == pontoCd[pontoCd.length - 1].categoria_cod_categoria && ponto[x + 1].cod_ponto == pontoCd[pontoCd.length - 1].cod_ponto) {
                    pontoCd[pontoCd.length - 1].tipologias[pontoCd[pontoCd.length - 1].tipologias.length] = ponto[x + 1].tipologias[ponto[x + 1].tipologias.length - 1];
                } else {
                    pontoCd.push(ponto);
                }
            }
            return pontoCd;
        }
        /*==============================================  ================================================*/

        function getEditUacom(uacom) {
            var acompanhamento = [];
            for (var z = 0; z < uacom.length; z++) {
                acompanhamento[z] = {
                    cd_municipio_cod_ibge: uacom[z].cd_municipio_cod_ibge,
                    titulo: uacom[z].titulo,
                    relato: uacom[z].relato,
                    data: uacom[z].data,
                    assuntos: [{
                        cod_assunto: uacom[z].cod_assunto,
                        descricao: uacom[z].descricao
                    }]

                }
            };
            var acompanhamentoCd = [acompanhamento[0]];
            for (var x = 0; x < acompanhamento.length - 1; x++) {
                if (acompanhamento[x + 1].cd_municipio_cod_ibge == acompanhamentoCd[acompanhamentoCd.length - 1].cd_municipio_cod_ibge && acompanhamento[x + 1].data == acompanhamentoCd[acompanhamentoCd.length - 1].data) {
                    acompanhamentoCd[acompanhamentoCd.length - 1].assuntos[acompanhamentoCd[acompanhamentoCd.length - 1].assuntos.length] = acompanhamento[x + 1].assuntos[acompanhamento[x + 1].assuntos.length - 1];
                } else {
                    acompanhamentoCd.push(acompanhamento);
                }
            }
            return acompanhamentoCd;
        };

        function getAcompanhamentosById(codIbge, data) {
            return $http.get('read/acompanhamento/' + codIbge + '/' + data);
        }

        function permissaoAcesso(numModulo, modulos) {
            var permitido = false;
            for (var x = 0; x < modulos.length; x++) {
                if (modulos[x] == numModulo) {
                    permitido = true;
                    break;
                }
            }
            return permitido;
        }

    }
})();
//