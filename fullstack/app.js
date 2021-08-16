var express = require('express');
var app = express();
var port = process.env.PORT || 9001;

var menu = [
    {link:'/', name:'Home'},
    {link:'/category', name:'Category'},
    {link:'/products', name:'Products'},
    {link:'/restaurants', name:'Restaurants'}
]

var productRouter = require('./src/routes/productRoutes')(menu);
var restaurantRouter = require('./src/routes/restaurantsRoutes')(menu);
var categoryRouter = require('./src/routes/categoryRoutes')(menu);

// static File Path
app.use(express.static(__dirname+'/public'));
// html file path
app.set('views','./src/views');
// view engine
app.set('view engine', 'ejs');


var data = [
    {
        "id":1,
        "name":"Shopping",
        "image":"https://i.ibb.co/56VP0Fn/cloths.jpg",
        "link":"/category"
    },
    {
        "id":2,
        "name":"Restaurants",
        "image":"https://b.zmtcdn.com/data/pictures/chains/3/6303/640252389ddc3f264dd0e9f2741e73cd.jpg",
        "link":"/restaurants"
    }
]
// default route
app.get('/', function(req, res) {
    // res.send('Home Page')
    res.render('index',{title:'Home Page',data:data, menu:menu})
});

app.use('/products',productRouter);
app.use('/restaurants',restaurantRouter);
app.use('/category',categoryRouter);

app.listen(port, function(err){
    if(err) throw err;
    else{
        console.log("Server is running on port "+port)
    }
})


