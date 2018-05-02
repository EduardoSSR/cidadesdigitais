module.exports = function(app){
    var api = {};
    
    //Lista todos os Módulos.
    api.listaModulos = function (req, res){
    	var connection = app.infra.connectionFactory();
        var modulosDAO = new app.infra.ModulosDAO(connection);

        modulosDAO.listarModulo(function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                res.status(200).json(resultado);
            }
        });

        connection.end();
    };
    
    
    //Listas os Modulos que o Usuario tem acesso
    api.listaModulosUsuario = function(req, res){
        var cod_usuario = req.params.cod_usuario;
        
        var connection = app.infra.connectionFactory();
        var modulosDAO = new app.infra.ModulosDAO(connection);

        modulosDAO.listarModuloUsuario(cod_usuario, function (erro, resultado){
            if(erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var array = [];
                for(var i=0; i<resultado.length; i++){
                    array[i] = resultado[i].modulo_cod_modulo;
                }
                res.status(200).json(array);
            }
        });

        connection.end();
    };
    
    return api;
};