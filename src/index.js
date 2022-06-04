const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const port=process.env.PORT || 8080;
const { sendMail }=require('./conf/nodemailer');

app.get('/',async (req,res)=>{
    //await sendMail('abfn0905@gmail.com','teste','teste');
    return res.status(200).json('Running API');
});
app.listen(port,()=>console.log(`Started Server on ${port}`));