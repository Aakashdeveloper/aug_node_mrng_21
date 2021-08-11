var express = require('express');
var categoryRouter = express.Router();

var category = [
    {
        "id":1,
        "category": "Fashion",
        "thumb":"https://i.ibb.co/56VP0Fn/cloths.jpg"
    },
    {
        "id":2,
        "category":"Electronics",
        "thumb":"https://i.ibb.co/pw5Wtdx/appliances.jpg"
    },
    {
        "id":3,
        "category":"Essentials",
        "thumb":"https://i.ibb.co/0cw34xm/essentials.jpg"
    },
    {
        "id":4,
        "category": "Footwear",
        "thumb":"https://i.ibb.co/r3SZq8S/footware.jpg"
    }
]

function router(menu){
    categoryRouter.route('/')
    .get(function(req, res){
        // res.send('<h1>Hii from Category</h1>')
        res.render('category',{title: 'Category Page', category:category,menu:menu})
    })

    return categoryRouter
}


module.exports = router;


