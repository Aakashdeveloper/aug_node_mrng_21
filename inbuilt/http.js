var http = require('http');

// req > what we send to server like params, queryparams, body
// res > what server send in the response/output

var server = http.createServer(function(req, res){
    res.write('<h1>Created Server with Node</h1>');
    res.end()
})


server.listen(5100)