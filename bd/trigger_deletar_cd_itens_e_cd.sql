delimiter |
create trigger deletar_cd_itens_e_cd before delete on cd
	for each row 
begin
delete from cd_itens where cd_municipio_cod_ibge = old.municipio_cod_ibge;
end |