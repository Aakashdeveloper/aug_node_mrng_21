const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const port = 9800;

//static path for ejs
app.use(express.static(__dirname+'/public'))
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(fileUpload())

app.get('/',(req,res) => {
    res.render('app')
})

app.post('/profile',(req,res) => {
    console.log(req.files);
    console.log(req.body);
    const imageFile = req.files.avatar;
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`,(err,data) => {
        if(err) throw err;
        res.render('display', {image:`${imageFile.name}`,title:req.body.uname})
    })
})

app.listen(port)