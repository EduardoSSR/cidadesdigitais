$(document).ready(function () {
    $('.valor').mask('0.000.000,00', {reverse: true});
    $('.quantidade').mask('99999');
    $('#cpf').mask('999.999.999-99');
    $('#processo').mask('99999.99999/9999-99');
    /*$('#telefone').mask('(99) 9999-9999');*/
    /*Mascara de telefone e celular, adiciobar na tag input  mask="(99)9?9999-9999"*/
});

