-- Trigger para inserir registros na tabela itens_previsao_empenho depois que é inserido 1 registro na tabela previsao_empenho
delimiter |
create trigger insere_itens_previsao_empenho after insert on previsao_empenho
for each row
begin
	insert into itens_previsao_empenho (previsao_empenho_cod_previsao_empenho, lote_itens_itens_cod_item, lote_itens_itens_tipo_item_cod_tipo_item, lote_itens_lote_cod_lote)
	(select previsao_empenho.cod_previsao_empenho, lote_itens.itens_cod_item, lote_itens.itens_tipo_item_cod_tipo_item, lote_itens.lote_cod_lote
    from previsao_empenho, lote_itens
    inner join itens on (lote_itens.itens_cod_item = itens.cod_item and lote_itens.itens_tipo_item_cod_tipo_item = itens.tipo_item_cod_tipo_item) 
    where previsao_empenho.cod_previsao_empenho = (select last_insert_id(new.cod_previsao_empenho)) and lote_itens.lote_cod_lote = previsao_empenho.lote_cod_lote and itens.natureza_despesa_cod_natureza_despesa = previsao_empenho.natureza_despesa_cod_natureza_despesa);
end |   