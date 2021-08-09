var express = require('express');
var app = express();
var port = process.env.PORT || 9000;
var productRouter = require('./src/routes/productRoutes');
var restaurantRouter = require('./src/routes/restaurantsRoutes');
var categoryRouter = require('./src/routes/categoryRoutes');

// static File Path
app.use(express.static(__dirname+'/public'));
// html file path
app.set('views','./src/views');
// view engine
app.set('view engine', 'ejs');

// default route
app.get('/', function(req, res) {
    // res.send('Home Page')
    res.render('category',{title:'Code From Node'})
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


