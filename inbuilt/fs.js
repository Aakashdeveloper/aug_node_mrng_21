var fs = require('fs');

/*
fs.writeFile('myCode.txt', ' Ny code second line 222',function(err)
{
    if(err) throw error;
    console.log('File Created')
})
*/

/*
fs.appendFile('myText.txt',"This is line 333 \n",function(err){
    if(err) throw error;
    console.log('File Created')
})


fs.readFile('db.json','utf-8',function(err,data){
    if(err) throw error;
    console.log(data)
})



fs.rename('myCode.txt','mytestcode.txt',function(err){
    if(err) throw err;
    console.log('File renamed')
})*/

fs.unlink('myText.txt',function(err){
    if(err) throw err;
    console.log('File Deleted')
})