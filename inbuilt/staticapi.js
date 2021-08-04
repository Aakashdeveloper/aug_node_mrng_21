var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 7800

var server = http.createServer(function(req, res){
    console.log(port)
    // reading JSON file
    fs.readFile('db.json','utf-8',function(err, data){
        if(err) throw err;
        res.write(data)
        res.end()
    })
})

server .listen(port)
