module.exports = function(app){    
    
	/*app.get('/Erro404', function(req, res){
		res.status(404);
	});*/
    
	app.all('/*', function(req, res){
        res.render('index', function(err, html) {
            res.send(html);
        });
    });
    
};