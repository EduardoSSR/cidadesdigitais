
-- 

delimiter |

create trigger deletar_ponto_tipologia before delete on ponto
for each row

begin delete from ponto_tipologia where ponto_cod_ponto = (old.cod_ponto);
end |

select * from ponto_tipologia

delete from ponto where cod_ponto = 12