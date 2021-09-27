const express= require("express")
const app=express()
const port=3000;
const path = require('path');

require('dotenv').config()


const Twitter=require('./api/helpers/twitter');
const twitter=new Twitter();

app.use(express.static(path.join(__dirname, 'public')));


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
})


app.get('/',function(req,res){
    res.sendFile(__dirname + '/new.html');
  });




app.get('/tweets',(req,res)=>{
    
   
   const query=req.query.q;
    const count= req.query.count;
   const max=req.query.max_id;
    twitter.gets(query,count,max).then((response)=>{
       res.status(200).send(response.data);
    }).catch((error)=>{
        console.log(error);
    })
    
})

app.listen(port,()=>console.log(`twitter api lists`))