const express = require('express');
const app = express();
var dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT || 7000;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoUrl = process.env.LocalDB;
const swaggerUi = require('swagger-ui-express');
const package = require('./package.json');
const swaggerDocument = require('./swagger.json');

swaggerDocument.info.version = package.version;
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument))

let db;
let col_name="restapi";

// middleware
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(cors());

// healthCheck
app.get('/',(req,res) => {
    res.status(200).send("Health Ok")
});

// healthCheck
app.get('/health',(req,res) => {
    res.status(200).send("Health Ok")
});

//Read
app.get('/users',(req,res) => {
    var query = {}
    if(req.query.role && req.query.city){
        query={role:req.query.role,city:req.query.city,isActive:true}
    }else if(req.query.role){
        query={role:req.query.role,isActive:true}
    }
    else if(req.query.city){
        query={city:req.query.city,isActive:true}
    }else{
        query={isActive:true}
    }
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
})

// get Particular user
app.get('/user/:id',(req,res) =>{
    var id = mongo.ObjectId(req.params.id)
    db.collection(col_name).find({_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//Post
app.post('/addUser',(req,res) => {
    console.log(req.body)
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Data Added')
    })
})

// update User
app.put('/updateUser',(req,res) =>{
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                name: req.body.name,
                city: req.body.city,
                phone: req.body.phone,
                role: req.body.role,
                isActive:true
            }
        },(err,result)=>{
            if(err) throw err;
            res.send("Data Updated")
        }
    )
})



//delete user
app.delete('/deleteUser',(req,res)=>{
    db.collection(col_name).remove(
        {_id:mongo.ObjectId(req.body._id)},(err,result)=>{
            if(err) throw err;
            res.send("Data Deleted")
        }
    )
})

// soft delete
app.put('/deactivate',(req,res) =>{
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:false
            }
        },(err,result)=>{
            if(err) throw err;
            res.send("User Deactivated")
        }
    )
})

// activate user
app.put('/activate',(req,res) =>{
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:true
            }
        },(err,result)=>{
            if(err) throw err;
            res.send("User Deactivated")
        }
    )
})


//DB Connection
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('augnode');
    app.listen(port,(err) => {
        console.log(`Server is running on port ${port}`)
    })
})