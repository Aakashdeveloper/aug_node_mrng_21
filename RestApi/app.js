const express = require('express');
const app = express();
var dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT || 7000;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongourl = process.env.LocalDB;

let db;
let col_name="restapi";

// middleware
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(cors());

// healthCheck
app.get('/health',(req,res) => {
    res.status(200).send("Health Ok")
});

//Read
app.get('/users',(req,res) => {
    db.collection(col_name).find({}).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
})


//DB Connection
MongoClient.connect(mongourl,(err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('augnode');
    app.listen(port,(err) => {
        console.log(`Server is running on port ${port}`)
    })
})