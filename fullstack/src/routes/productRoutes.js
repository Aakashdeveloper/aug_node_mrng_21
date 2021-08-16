var express = require('express');
var productRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

function router(menu){
    productRouter.route('/')
    .get(function(req,res){
        mongodb.connect(url, function(err, dc){
            if(err){
                res.status(501).send("Error While Connecting")
            }else{
                const dbo = dc.db('augnode');
                dbo.collection('products').find().toArray(function(err, data){
                    if(err){
                        res.status(501).send("Error While Fetching")
                    }else{
                        res.render('products',{title: 'Products Page', products:data,menu:menu})
                    }
                })
            }
        })
    })

    productRouter.route('/category/:id')
        .get(function(req,res){
            // var _id = req.params._id
            var {id} = req.params
            //var name = req.query.name
            mongodb.connect(url, function(err, dc){
                if(err){
                    res.status(501).send("Error While Connecting")
                }else{
                    const dbo = dc.db('augnode');
                    
                    dbo.collection('products').find({category_id:Number(id)}).toArray(function(err, data){
                        console.log(id)
                        console.log(data)
                        if(err){
                            res.status(501).send("Error While Fetching")
                        }else{
                            res.render('productCategory',{title: 'Products Category', products:data,menu:menu})
                        }
                    })
                }
            })
    })

    productRouter.route('/details/:id')
        .get(function(req,res){
            var _id = req.params._id
            res.send('Products Details Page for is ',id)
    })

    return productRouter
}


module.exports = router