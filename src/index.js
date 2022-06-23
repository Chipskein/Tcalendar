require('dotenv').config();
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
const timesRoutes=require('./routes/timesRoutes.js');
const usersRoutes=require('./routes/usersRoutes.js');
const enterprise_usersRoutes=require('./routes/enterprise_usersRoutes.js');
const times_inviteRoutes=require('./routes/times_inviteRoutes.js');
const times_usersRoutes=require('./routes/times_usersRoutes.js');

app.use('/enterprises',enterprisesRoutes);
app.use('/schedules',schedulesRoutes);
app.use('/times',timesRoutes);
app.use('/users',usersRoutes);
app.use('/enterprise_users',enterprise_usersRoutes);
app.use('/times_invite',times_inviteRoutes);
app.use('/times_users',times_usersRoutes);

app.listen(port,()=>console.log(`Started Server on ${port}`));



