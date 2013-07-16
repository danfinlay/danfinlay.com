var trumpet = require('trumpet')
var fs = require('fs')

module.exports = function(req, res){

	res.writeHead(200)

	var tr = trumpet()

	tr.selectAll('.contextSensitive', function(elem){
		fs.createReadStream(__dirname+'/dynamic/home/landing1.html')
		.pipe(elem.createWriteStream())
	})

	fs.createReadStream(__dirname+'/index.html')
	.pipe(tr).pipe(res)

}