var express = require('express');
var restaurantRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = process.env.LiveMongo;

function router(menu){
	restaurantRouter.route('/')
    .get(function(req,res){
		mongodb.connect(url, function(err, dc){
            if(err){
                res.status(501).send("Error While Connecting")
            }else{
                const dbo = dc.db('restaurents');
                dbo.collection('rest').find().toArray(function(err, data){
                    if(err){
                        res.status(501).send("Error While Fetching")
                    }else{
						res.render('restaurants',{title: 'Restaurants Page', data:data,menu})

                    }
                })
            }
        })
			});
	


	restaurantRouter.route('/details')
    .get(function(req,res){
        res.send('Restaurants Details Page')
	})
	
	return restaurantRouter
}


module.exports = router;