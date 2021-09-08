var express = require('express');
var productRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = process.env.LiveMongo;

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
            var {id} = req.params
            mongodb.connect(url, function(err, dc){
                if(err){
                    res.status(501).send("Error While Connecting")
                }else{
                    const dbo = dc.db('augnode');
                    dbo.collection('products').findOne({_id:Number(id)},function(err, data){
                        if(err){
                            res.status(501).send("Error While Fetching")
                        }else{
                            res.render('productDetails',{title: 'Products Details', products:data,menu:menu})
                        }
                    })
                }
            })
    })

    return productRouter
}


module.exports = router