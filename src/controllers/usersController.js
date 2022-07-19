const { uploadImage }=require('../utils/image')
const { hashPassword,verifyPassword } =require('../utils/password');
const { Users }=require('../models/usersModel');
const { sendEmail }=require('../utils/email')
const { createJWT,getDataFromToken,prepareSessionToken, prepareTempToken }=require('../utils/jwt');
class UserController{

    static async showRegister(req,res){
        return res.render('register',{err:false});
    }
    static async showHome(req,res){
        const { user }=req.data;
        const { enterprise }=user;
        if(enterprise) return res.redirect('/enterprises/home');
        
        //return res.render('home',{user,enterprise});
        return res.redirect('/enterprises/');
    }
    static async showLogin(req,res){
        return res.render('login',{err:false});
    }
    static async showResetPasswordForm(req,res){
        try{
            const temp_token=req.query.token;
            const user = getDataFromToken(temp_token);
            const session_token=await prepareSessionToken(user.id,user.email);
            res.cookie('token',session_token);
            return res.render('forgetPassword',{user});
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
    static async showForgetMyPasswordForm(req,res){
        return res.render('showForgetPassword',{err:false});
    }
    static async forgetMyPasswordForm(req,res){
        try{
            const { email }=req.body;
            let user=await Users.findOne({where: { email }});
            if(!user) return res.render('showForgetPassword',{err:'Usuario nao existe'});   
            user=user.dataValues;   
            await sendEmail({
                email:user.email,
                server_url:req.protocol + '://' + req.get('host'),
                token:await prepareTempToken(user.id,user.email),
                name:user.name,
                team:false,
                enterprise:false
            },'reset_password');
            return res.send('Email Enviado');
        }
        catch(err){
            return res.render('showForgetPassword',{err:err.message});   
        }
    }
    
    static async register(req,res){
        try{
            const {name,password,email} =req.body;
            const file=req.file;
            const hashedPassword=hashPassword(password);
            const userDataInsert={
                name,
                email,
                password:hashedPassword
            }
            const user=await Users.create(userDataInsert);
            if(file&&(file.mimetype=='image/jpeg'||file.mimetype=='image/gif'||file.mimetype=='image/png')){
                const { link }=await uploadImage(req.file)
                if(link){
                    user.img=link;
                    await user.save();
                };
            };
            const data=user.toJSON()

            await sendEmail({
                email:data.email,
                server_url:req.protocol + '://' + req.get('host'),
                token:createJWT({id:data.id},'temp'),
                name:data.name,
                team:false,
                enterprise:false
            });
            return res.render('active_account',{user:data});
        }
        catch(err){
            return res.render('register',{err:err.message});            
        }
    }
    static async login(req,res){
        try{
            const { email,password }=req.body;
            let user=await Users.findOne({where: { email }});
            if(!user) return res.render('login',{err:'Usuario nao existe'});   
            user=user.dataValues;  
            if(user.active){      
                if(verifyPassword(password,user.password)){
                    const token=await prepareSessionToken(user.id,user.email);
                    res.cookie('token', token);
                    return res.redirect('/users/home');
                } else{
                    return res.render('login',{err:'Credenciais invalidas'});   
                }
            } else{
                await sendEmail({
                    email:user.email,
                    server_url:req.protocol + '://' + req.get('host'),
                    token:await prepareTempToken(user.id,user.email),
                    name:user.name,
                    team:false,
                    enterprise:false
                });
                return res.render('active_account',{user:user});
            }
        }
        catch(err){
            return res.render('login',{err:err.message});   
        }
    }
    static async logoff(req,res){
        try{
            req.data=null;
            res.cookie('token','');
            return res.redirect('/users/login');
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
    static async update(req,res){
        try{
            const updateDataRow={}
            let {name,email,password} =req.body
            const file=req.file;
            if(password) updateDataRow.password=hashPassword(password);
            if(name) updateDataRow.name=name;
            if(email) updateDataRow.email=email;
            if(file&&(file.mimetype=='image/jpeg'||file.mimetype=='image/gif'||file.mimetype=='image/png')){
                const { link }=await uploadImage(req.file)
                if(link) updateDataRow.img=link;
            };
            await Users.update(updateDataRow,{where: { id:req.data.user.id }});
            return res.redirect('/users/home');
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
    static async activeUser(req,res){
        try{
            const temp_token =req.query.token;
            const { id,email } = getDataFromToken(temp_token);
            await Users.update({ active: true },{where: { id }});
            const session_token= await prepareSessionToken(id,email);
            res.cookie('token',session_token);
            return res.redirect('/users/home');
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
}
module.exports=UserController;