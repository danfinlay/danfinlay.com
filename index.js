var fs = require('fs')
var http = require('http')
var url = require('url')
var ecstatic = require('ecstatic')
var _ = require('underscore')
var domain = require('domain')
var landingPageHandler = require('./landingPageHandler')
var lifeUpdateHandler = require('./lifeUpdateHandler')

http.createServer(function( req, res ){
	var d = domain.create()
	d.on('error', function(er){
		console.log("Response error: " + er)
	})
	d.run(function(){

		//Handling all sub-sections of site:
		if(req.url === '/doings*' || req.url === '/teachings*'){
			lifeUpdateHandler(req, res)

		//Handling home page:
		}else if(req.url === '' || req.url === '/' || req.url === '/home'){
			landingPageHandler(req, res)

		//Statically routing all other requests:
		}else{
			ecstatic({ root: __dirname + '/static' })(req, res)
		}	
	})	
}).listen(8087)