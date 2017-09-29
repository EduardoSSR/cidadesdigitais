module.exports = function(app){

	app.all('/*', function(req, res){
		res.render('index');
	});

	/*
	app.get('/cid/Erro404', function(req, res){
		res.status(404);
	});*/

};