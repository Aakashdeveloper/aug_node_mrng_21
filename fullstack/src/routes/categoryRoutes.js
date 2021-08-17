var express = require('express');
var categoryRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = process.env.MongoUrl;

function router(menu){
    categoryRouter.route('/')
    .get(function(req, res){
        mongodb.connect(url, function(err, dc){
            if(err){
                res.status(501).send("Error While Connecting")
            }else{
                const dbo = dc.db('augnode');
                dbo.collection('category').find().toArray(function(err, data){
                    if(err){
                        res.status(501).send("Error While Fetching")
                    }else{
                        res.render('category',{title: 'Category Page', category:data,menu:menu})
                    }
                })
            }
        })
        // res.send('<h1>Hii from Category</h1>')
       
    })

    return categoryRouter
}


module.exports = router;


