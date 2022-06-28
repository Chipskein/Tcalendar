require('dotenv').config()
require('./models/orm-setup');
const express=require('express');
const app=express();
const port=process.env.PORT || 8080;

app.set('view engine','ejs');
app.set('views','./src/views');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

//routes
const enterprisesRoutes=require('./routes/enterprisesRoutes.js');
const schedulesRoutes=require('./routes/schedulesRoutes.js');
const teamsRoutes=require('./routes/teamsRoutes.js');
const usersRoutes=require('./routes/usersRoutes.js');

app.use('/enterprises',enterprisesRoutes);
app.use('/schedules',schedulesRoutes);
app.use('/teams',teamsRoutes);
app.use('/users',usersRoutes);

app.use('*',(req,res)=>{
    return res.redirect('/users/home');
});
app.listen(port,()=>console.log(`Started Server on ${port}`));



