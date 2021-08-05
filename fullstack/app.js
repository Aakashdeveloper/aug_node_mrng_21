var express = require('express');
var app = express();
var port = process.env.PORT || 9000;

var users = [
    {
        "name":"John",
        "city":'Delhi'
    },
    {
        "name":"Ankit",
        "city":'London'
    },
    {
        "name":"Nikita",
        "city":'Paris'
    }
]

// default route
app.get('/', function(req, res) {
    res.send('Hi from express api')
});

app.get('/hotels', function(req, res) {
    res.send('Hii From Hotels')
});

app.get('/users', function(req, res) {
    res.send(users)
});


app.get('/city', function(req, res) {
    res.send('Hii From City')
})

app.listen(port, function(err){
    if(err) throw err;
    else{
        console.log("Server is running on port "+port)
    }
})


