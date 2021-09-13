const express = require('express');
const app = express();
const superagent = require('superagent');
const request = require('request');
const port = 9800;
const cors = require('cors');

app.use(cors());

app.get('/',(req,res) =>{
    res.send('<a href="https://github.com/login/oauth/authorize?client_id=34526f5c9db4411cb877">Login With GitHub</a>')
})

app.get('/user',(req,res) => {
    const code = req.query.code;
    if(!code){
        res.send({
            success:false,
            message:'Error on code'
        })
    }
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'34526f5c9db4411cb877',
            client_secret:'5517aea7d67312d4c092957b12d4d2668b4594f9',
            code:code
        })
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})

