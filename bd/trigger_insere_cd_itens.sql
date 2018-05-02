delimiter | 
create trigger insere_cd_itens after insert on cd 
for each row 
BEGIN 
insert into cd_itens (cd_municipio_cod_ibge, itens_cod_item, itens_tipo_item_cod_tipo_item) (select cd.municipio_cod_ibge, itens.cod_item, itens.tipo_item_cod_tipo_item from cd, itens
where cd.municipio_cod_ibge = (select last_insert_id(new.municipio_cod_ibge)));
END|