var express = require('express');
var axios = require('axios');
var redis = require('redis');
var port = 8700
var app = express();

const client = redis.createClient({
    host:'localhost',
    port: 6379
})

app.get('/data', function (req, res) {
    var userInput = (req.query.country).trim()
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

    // check is data in redisapp
    client.get(`${userInput}`,(err,result) => {
        if(result){
            const output = JSON.parse(result)
            res.send(output)
        }else{
            // we call the api to get data
            axios.get(url)
                .then(response => {
                    //api respone 
                    const output = response.data;
                    // save data in redis for next time
                    client.setex(`${userInput}`,3600,JSON.stringify({source:'Redis', output}))
                    // return to api
                    res.status(200).send({source:'APi',output})
                })
        }
    })
 
})

app.listen(port,(err) => {
        console.log(`Server is running on port ${port}`)
})