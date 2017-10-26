-- Trigger para atualizar valor depois que é inserido um registro na tabela de itens itens_previsao_empenho
delimiter |
create trigger atualiza_valor_itens_previsao_empenho before insert on itens_previsao_empenho
for each row
begin
	set new.valor = 
		(select ROUND(lote_itens.preco*(exp(sum(ln(reajuste.percentual/100 + 1)))),2) from lote_itens
		inner join lote on (lote_itens.lote_cod_lote = lote.cod_lote)
		inner join reajuste on (lote.cod_lote = reajuste.lote_cod_lote)
        where lote_itens.lote_cod_lote = (select last_insert_id(new.lote_itens_lote_cod_lote)) and lote_itens.itens_cod_item = (select last_insert_id(new.lote_itens_itens_cod_item)) and lote_itens.itens_tipo_item_cod_tipo_item = (select last_insert_id(new.lote_itens_itens_tipo_item_cod_tipo_item)));
end |