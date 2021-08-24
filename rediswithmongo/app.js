var redis = require('redis');
var express = require('express');
var app = express();
var port = 9870;
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

const client = redis.createClient({
    host:'localhost',
    port: 6379
})

app.get('/data',function(req,res){
    const UserInput = (req.query.productName).trim();
    // check in redis
    client.get(`${UserInput}`,(err,result) => {
        // return from redis
        if(result){
            const output = JSON.parse(result);
            res.send(output)
        }else{
            // getting form mongodb
            mongodb.connect(url, function(err, dc){
                if(err){
                    res.status(501).send("Error While Connecting")
                }else{
                    const dbo = dc.db('augnode');
                    dbo.collection('products').find({product_name:UserInput}).toArray(function(err, data){
                        if(err){
                            res.status(501).send("Error While Fetching")
                        }else{
                            // saving result in redis
                            client.setex(`${UserInput}`,4200,JSON.stringify({source:'Redis Cache', data}))
                            // return from mongodb
                            res.send({source:'Mongofb', data})
                        }
                    })
                }
            })
        }
    })
})

app.listen(port,(err) => {
    console.log(`Server is running on port ${port}`)
})