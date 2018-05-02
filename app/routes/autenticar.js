module.exports = function(app){
    
    var autenticar = app.api.autenticar;
    
    app.route('/usuario')
        .post(autenticar.autentica);
    
    app.use('/read/*', autenticar.verificaToken);
    
};