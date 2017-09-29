delimiter |
create trigger deletar_contato_e_numero before delete on contato
	for each row 
begin 
	delete from telefone where contato_cod_contato = old.cod_contato;
end
| delimiter
  