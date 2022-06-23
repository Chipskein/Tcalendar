require('dotenv').config();
const express=require('express');
const app=express();
const port=process.env.PORT || 8080;

app.set('view engine','ejs');
app.set('views','./src/views');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/',async (req,res)=>{
    return res.status(200).json('Running API');
});

app.listen(port,()=>console.log(`Started Server on ${port}`));



