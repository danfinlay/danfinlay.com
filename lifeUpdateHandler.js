var fs = require('fs');
var trumpet = require('trumpet');
var _ = require('underscore');
var url = require('url');
var through = require('through');
var domain = require('domain');

module.exports = function(req, res){
  var d = domain.create();
  d.on('error', function(e){
    console.log("Life update error: "+e.message);
  })
  d.run(function(){
    var queryPaths = url.parse(req.url, true).path.split('/');
    //console.log("Requested: "+queryPaths)
    res.writeHead(200);

    fs.readdir( __dirname + '/dynamic/' + queryPaths[2] , function(e, files){

      var categoryTrumpet = trumpet();
      categoryTrumpet.selectAll('.contextSensitive', function(elem){
        fs.createReadStream(__dirname+'/templates/'+queryPaths[2]+'.html');
        .pipe(elem.createWriteStream());
      })

      var entryTrumpet = trumpet();
      entryTrumpet.selectAll('.entries', function(elem){
        
        if(e){
          res.end('Trouble retrieving entries :(');
          console.log("Entry retrieval error: "+e);
        }else{
          var entries = _.filter(files, function(fileName){ 
            var result = fileName.indexOf('.html') !== -1 ? true : false ;
            return result;
          })
      
          var i = 0;
          var entriesLength = entries.length;
          if(entriesLength === 0){
            res.write("<br><div class='span12'>Looks like there's nothing here!  This is a pretty new site, check back soon for some sweet updates!</div>");
          }else{
            var ews = elem.createWriteStream();
            //console.log("Returning "+entriesLength+" articles: "+JSON.stringify(entries))
            for(i = 0; i < entriesLength; i++){
              fs.createReadStream(__dirname+'/dynamic/'+queryPaths[2]+'/'+entries[i]);
              .pipe(through(function(chunk){
                //console.log("Queueing this chunk: "+chunk.toString())
                res.write(chunk);
              })).pipe(ews);
            }
          }
        }
      })

      fs.createReadStream(__dirname+'/index.html')
      .pipe(categoryTrumpet).pipe(entryTrumpet).pipe(res);
    })
  })
}