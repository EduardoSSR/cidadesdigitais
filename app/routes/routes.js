module.exports = function(app){
    
    var usuario = app.api.usuario;
    var entidade = app.api.entidades;
    var cd = app.api.cd;
    var contato = app.api.contato;
    var lotes = app.api.lotes;
    var empenho = app.api.empenho;
    var otb = app.api.otb;
    var fatura = app.api.fatura;
    var previsaoEmpenho = app.api.previsaoEmpenho;
    var assunto = app.api.assunto;
    var categoria = app.api.categoria;
    var classeEmpenho = app.api.classeEmpenho;
    var etapa = app.api.etapa;
    var itens = app.api.itens;
    var municipio = app.api.municipios;
    var naturezaDespesa = app.api.naturezaDespesa;
    var modulos = app.api.modulos;
    var prefeitos = app.api.prefeitos;
    var tipologia = app.api.tipologia;
    var tipoItem = app.api.tipoItem;
    
    
    
//*************** Rotas em Usuário ***************//
    //---------Rotas de Usuário---------//
    app.route('/read/usuario')
        .get(usuario.listaUsuario)
        .post(usuario.salvaUsuario)
        .put(usuario.editaUsuario);
    
    app.route('/read/usuario/:id')
        .get(usuario.listaUsuarioPorId)
        .delete(usuario.apagaUsuario);
    
    
    
//*************** Rotas em Entidades ***************//
    //---------Rotas de Entidade---------//
    app.route('/read/entidades')
        .get(entidade.listaEntidade)
        .post(entidade.salvaEntidade)
        .put(entidade.editaEntidade);
    
    app.route('/read/entidades/:id')
        .get(entidade.listaEntidadePorId)
        .delete(entidade.apagaEntidade);
    

    
//*************** Rotas em Cidade Digital (cd) ***************//
    //---------Rotas de Estado---------//
    app.route('/read/cd/estado')
        .get(cd.listaEstados);
    
    //---------Rotas de Municipios da Cidade Digital---------//
    app.route('/read/cd/municipio/:uf')
        .get(cd.listaCdMunicipios);
    
    //---------Rotas de Cidade Digital---------//
    app.route('/read/cd')
        .get(cd.listaCd)
        .post(cd.salvaCd)
        .put(cd.editaCd);
    
    app.route('/read/cd/:id')
        .get(cd.listaCdPorId)
        .delete(cd.apagaCd);
    
    //---------Rotas de Itens da Cidade Digital---------//
    app.route('/read/cdItens/:id')
        .get(cd.listaCdItens);
    
    app.route('/read/cdItens')
        .put(cd.editaCdItens);
    
    //---------Rotas de Processo da Cidade Digital---------//
    app.route('/read/processo')
        .get(cd.listaCdProcessso)
        .post(cd.salvaCdProcesso)
        .put(cd.editaCdProcesso);
    
    app.route('/read/processo/:cod_processo/:cd_municipio_cod_ibge')
        .get(cd.listaCdProcesssoPorId)
        .delete(cd.apagaCdProcesso);
    
    //---------Rotas de Acompanhamento da Cidade Digital---------//
    app.route('/read/acompanhamento')
        .get(cd.listaCdAcompanhamento)
        .post(cd.salvaCdAcompanhamento);
    
    app.route('/read/uacomAssunto')
        .post(cd.salvaCdUacomAssunto);
    
    app.route('/read/acompanhamento/:cd_municipio_cod_ibge/:data/')
        .get(cd.listaCdAcompanhamentoPorId);
    
    //---------Rotas de Ponto da Cidade Digital---------//
    app.route('/read/ponto')
        .get(cd.listaCdPonto)
        .post(cd.salvaCdPonto)
        .put(cd.editaCdPonto);
    
    app.route('/read/ponto/:cod_ponto/:categoria_cod_categoria/:cd_municipio_cod_ibge')
        .get(cd.listaCdPontoPorId)
        .delete(cd.apagaCdPonto);
    
    app.route('/read/pontoTipologia/:cod_ponto/:categoria_cod_categoria/:cd_municipio_cod_ibge/:tipologia_cod_tipologia')
        .delete(cd.apagaCdPontoTipo);
    
    //---------Rotas de Pagamento da Cidade Digital---------//
    app.route('/read/otbCD/:cod_ibge')
        .get(cd.listaCdPagamento);
    
    

//*************** Rotas em Contato ***************//
    //---------Rotas de Contato---------//
    app.route('/read/contato')
        .get(contato.listaContato)
        .post(contato.salvaContato)
        .put(contato.editaContato);
    
    app.route('/read/contato/:id')
        .delete(contato.apagaContato);
    
    //---------Rotas de Telefone---------//
    app.route('/read/telefone')
        .get(contato.listaTelefone)
        .post(contato.salvarTelefone);
    
    app.route('/read/telefone/:id')
        .delete(contato.apagaTelefone);
    
    

//*************** Rotas em Lotes ***************//
    //---------Rotas de Lote---------//
    app.route('/read/lotes')
        .get(lotes.listaLote)
        .post(lotes.salvaLote)
        .put(lotes.editaLote);
    
    app.route('/read/lotes/:id')
        .get(lotes.listaLotePorId)
        .delete(lotes.apagaLote);
    
    //---------------Rotas de Reajuste---------------//
    app.route('/read/reajuste')
        .get(lotes.listaReajuste)
        .post(lotes.salvaReajuste);
    
    app.route('/read/reajuste/:lote_cod_lote/:ano_ref')
        .delete(lotes.apagaReajuste);
    
    //---------------Rotas de Itens do Lote---------------//
    app.route('/read/loteItens')
        .put(lotes.editaLoteItens);
    
    app.route('/read/loteItens/:id')
        .get(lotes.listaLoteItens);
    
    
    
//*************** Rotas em Empenho ***************//
    //---------Rotas de Empenho---------//
    app.route('/read/empenho')
        .get(empenho.listaEmpenho)
        .post(empenho.salvaEmpenho)
        .put(empenho.editaEmpenho);
    
    app.route('/read/empenho/:id')
        .get(empenho.listaEmpenhoPorId)
        .delete(empenho.apagaEmpenho);
    
    //---------Rotas de Itens do Empenho---------//
    app.route('/read/empenhoItens')
        .put(empenho.editaEmpenhoItens);
    
    app.route('/read/empenhoItens/:id')
        .get(empenho.listaEmpenhoItens);
    
    
    
//*************** Rotas em Pagamento (otb) ***************//
    //---------Rotas de Pagamento---------//
    app.route('/read/otb')
        .get(otb.listaPagamento)
        .post(otb.salvaPagamento)
        .put(otb.editaPagamento);
    
    app.route('/read/otb/:id')
        .get(otb.listaPagamentoPorId)
        .delete(otb.apagaPagamento);
    
    //---------Rotas de Fatura do Pagamento---------//
    app.route('/read/otbMuniFatura/:cd_municipio_cod_ibge')
        .get(otb.listaMuniFatura);
    
    app.route('/read/otbFatura/:cod_otb')
        .get(otb.listaPagamentoFatura);
    
    app.route('/read/otbFat')
        .post(otb.salvaPagamentoFatura);
    
    //---------Rotas de Itens do Pagamento---------//
    app.route('/read/otbItens/:cod_otb')
        .get(otb.listaPagamentoItens);
    
    app.route('/read/otbItens')
        .put(otb.editaPagamentoItens);
    
    
    
//*************** Rotas em Fatura ***************//
    //---------Rotas de Fatura---------//
    app.route('/read/fatura')
        .get(fatura.listaFatura)
        .post(fatura.salvaFatura);
    
    app.route('/read/fatura/:id')
        .get(fatura.listaFaturaPorId)
        .delete(fatura.apagaFatura);
    
    //---------Rotas de Itens da Fatura---------//
    app.route('/read/faturaItens')
        .post(fatura.salvaFaturaItens)
        .put(fatura.editaFaturaItens);
    
    app.route('/read/faturaItens/:num_nf')
        .get(fatura.listaFaturaItens);
    
    app.route('/read/faturaItens/:municipio_cod_ibge/:natureza_despesa_cod_natureza_despesa/:cod_item/:cod_tipo_item')
        .get(fatura.listaFaturaItensPorId);
    
    app.route('/read/faturaItens/:fatura_num_nf/:cod_empenho/:cod_item/:cod_tipo_item')
        .delete(fatura.apagaFaturaItens);
    
    //---------Rotas de Pagamentos da Fatura---------//
    app.route('/read/faturaOtb/:num_nf/:cod_ibge')
        .get(fatura.listaPagamentoFatura);
    
    //---------Total Fatura---------//
    app.route('/read/totalFatura/:num_nf')
        .get(fatura.totalFatura);
    
    
    
//*************** Rotas em PrevisaoEmpenho ***************//
    //---------Rotas de Previsao_Empenho---------//
    app.route('/read/previsaoEmpenho')
        .get(previsaoEmpenho.listaPrevisaoEmpenho)
        .post(previsaoEmpenho.salvaPrevisaoEmpenho)
        .put(previsaoEmpenho.editaPrevisaoEmpenho);
    
    app.route('/read/previsaoEmpenho/:id')
        .get(previsaoEmpenho.listaPrevisaoEmpenhoPorId)
        .delete(previsaoEmpenho.apagaPrevisaoEmpenho);
    
    //---------Rotas de Itens da Previsao_Empenho---------//
    app.route('/read/previsaoEmpenhoItens')
        .put(previsaoEmpenho.editaPrevisaoEmpenhoItens);
    
    app.route('/read/previsaoEmpenhoItens/:cod_lote/:cod_previsao_empenho')
        .get(previsaoEmpenho.listaPrevisaoEmpenhoItens);
    
    
    
//*************** Rotas em Assunto ***************//
    //---------Rotas de Assunto---------//
    app.route('/read/assunto')
        .get(assunto.listaAssunto)
        .post(assunto.salvaAssunto);
    
    app.route('/read/assunto/:id')
        .get(assunto.listaAssuntoPorId)
        .put(assunto.editaAssunto)
        .delete(assunto.apagaAssunto);
    
    
    
//*************** Rotas em Categoria ***************//
    //---------Rotas de Categoria---------//
    app.route('/read/categoria')
        .get(categoria.listaCategoria)
        .post(categoria.salvaCategoria)
        .put(categoria.editaCategoria);
    
    app.route('/read/categoria/:id')
        .get(categoria.listaCategoriaPorId)
        .delete(categoria.apagaCategoria);
    
    
    
//*************** Rotas em ClasseEmpenho ***************//
    //---------Rotas de Classe_Empenho---------//
    app.route('/read/classeEmpenho')
        .get(classeEmpenho.listaClasseEmpenho)
        .post(classeEmpenho.salvaClasseEmpenho)
        .put(classeEmpenho.editaClasseEmpenho);
    
    app.route('/read/classeEmpenho/:id')
        .get(classeEmpenho.listaClasseEmpenhoPorId)
        .delete(classeEmpenho.apagaClasseEmpenho);

    
    
//*************** Rotas em Etapa ***************//
    //---------Rotas de Etapa---------//
    app.route('/read/etapa')
        .get(etapa.listaEtapa)
        .post(etapa.salvaEtapa)
        .put(etapa.editaEtapa);
    
    app.route('/read/etapa/:cod_etapa')
        .get(etapa.listaEtapaPorId)
        .delete(etapa.apagaEtapa);
    
    
    
//*************** Rotas em Itens ***************//
    //---------Rotas de Itens---------//
    app.route('/read/itens')
        .get(itens.listaItens)
        .post(itens.salvaItens)
        .put(itens.editaItens);
    
    app.route('/read/itens/:cod_item/:cod_tipo_item')
        .get(itens.listaItensPorId)
        .delete(itens.apagaItens);
    

    
//*************** Rotas em Municipios ***************//
    //---------Rotas de Municipio---------//
    app.route('/read/municipios')
        .get(municipio.listaMunicipio)
        .post(municipio.salvaMunicipio)
        .put(municipio.editaMunicipio);
    
    app.route('/read/municipios/:id')
        .get(municipio.listaMunicipioPorId)
        .delete(municipio.apagaMunicipio);
    
    
    
//*************** Rotas em NaturazaDespesa ***************//
    //---------Rotas de Natureza_Despesa---------//
    app.route('/read/naturezaDespesa')
        .get(naturezaDespesa.listaNaturezaDespesa)
        .post(naturezaDespesa.salvaNaturezaDespesa)
        .put(naturezaDespesa.editaNaturezaDespesa);
    
    app.route('/read/naturezaDespesa/:id')
        .get(naturezaDespesa.listaNaturezaDespesaPorId)
        .delete(naturezaDespesa.apagaNaturezaDespesa);
    
    
    
//*************** Rotas em Módulos ***************//
    //---------Rotas de Módulos---------//
    app.route('/read/modulo')
        .get(modulos.listaModulos);
    
    app.route('/read/usuario/:cod_usuario/modulos')
        .get(modulos.listaModulosUsuario);
    
    
    
//*************** Rotas em Prefeitos ***************//
    //---------Rotas de Assunto---------//
    app.route('/read/prefeitos')
        .get(prefeitos.listaPrefeitos)
        .post(prefeitos.salvaPrefeitos)
        .put(prefeitos.editaPrefeitos);
    
    app.route('/read/prefeitos/:id')
        .get(prefeitos.listaPrefeitosPorId)
        .delete(prefeitos.apagaPrefeitos);
    
    
    
//*************** Rotas em Tipologia ***************//
    //---------Rotas de Tipologia---------//
    app.route('/read/tipologia')
        .get(tipologia.listaTipologia)
        .post(tipologia.salvaTipologia)
        .put(tipologia.editaTipologia);
    
    app.route('/read/tipologia/:id')
        .get(tipologia.listaTipologiaPorId)
        .delete(tipologia.apagaTipologia);
    
    
    
//*************** Rotas em TipoItem ***************//
    //---------Rotas de Tipo do Item---------//
    app.route('/read/tipoItem')
        .get(tipoItem.listaTipoItem)
        .post(tipoItem.salvaTipoItem)
        .put(tipoItem.editaTipoItem);
    
    app.route('/read/tipoItem/:cod_tipo_item')
        .get(tipoItem.listaTipoItemPorId)
        .delete(tipoItem.apagaTipoItem);
    
};