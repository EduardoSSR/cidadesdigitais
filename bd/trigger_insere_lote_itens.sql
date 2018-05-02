delimiter |
create trigger insere_lote_itens after insert on lote
for each row
BEGIN
insert into lote_itens(lote_cod_lote, itens_cod_item, itens_tipo_item_cod_tipo_item) (select lote.cod_lote, itens.cod_item, itens.tipo_item_cod_tipo_item from lote, itens 
where lote.cod_lote = (select last_insert_id(new.cod_lote)));
END|
