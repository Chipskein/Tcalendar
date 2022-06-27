const { uploadImage }=require('../utils/image')
const { hashPassword,verifyPassword } =require('../utils/password');
const { Users }=require('../models/usersModel');
const { sendEmail }=require('../utils/email')
const { createJWT,getDataFromToken }=require('../utils/jwt');
class UserController{

    static async showRegister(req,res){
        return res.render('register',{err:false});
    }
    static async showHome(req,res){
        const user=req.user;
        let enterprise=false;
        let { getUserEnterprise } =await Users.findOne({where:{ id:user.id },include:{association:"getUserEnterprise"}});
        if(getUserEnterprise.length>0){
            enterprise=getUserEnterprise[0].dataValues;
            req.user.enterprise=enterprise;
        }

        return res.render('home',{user,enterprise});
    }
    static async showLogin(req,res){
        return res.render('login',{err:false});
    }
    static async showResetPasswordForm(req,res){
        try{
            const { token }=req.query;
            const { id } = getDataFromToken(token);
            let user=await Users.findByPk(id);
            user=user.dataValues;  
            req.user=user;
            const session_token=createJWT(user,'session');
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
                token:createJWT({id:user.id},'temp'),
                name:user.name,
                time:"",
                enterprise:""
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
                time:"",
                enterprise:""
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
                    delete(user.password);
                    const token=createJWT(user,'session');
                    res.cookie('token', token);
                    return res.redirect('/users/home');
                } else{
                    return res.render('login',{err:'Credenciais invalidas'});   
                }
            } else{
                await sendEmail({
                    email:user.email,
                    server_url:req.protocol + '://' + req.get('host'),
                    token:createJWT({id:user.id},'temp'),
                    name:user.name,
                    time:"",
                    enterprise:""
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
            req.user=null;
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
            if(name){
                updateDataRow.name=name;
                req.user.name=name;
            };
            if(email){
                updateDataRow.email=email;
                req.user.email=email;
            };
            if(file&&(file.mimetype=='image/jpeg'||file.mimetype=='image/gif'||file.mimetype=='image/png')){
                const { link }=await uploadImage(req.file)
                if(link){
                    updateDataRow.img=link;
                    req.user.img=link;
                };
            };
            await Users.update(updateDataRow,{where: { id:req.user.id }});
            return res.redirect('/users/home');
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
    static async activeUser(req,res){
        try{
            const { token }=req.query;
            const { id } = getDataFromToken(token);
            await Users.update({ active: true },{where: { id }});
            let user=await Users.findByPk(id);
            user=user.dataValues; 
            const session_token=createJWT(user,'session');
            res.cookie('token',session_token);
            req.user=user;
            return res.redirect('/users/home');
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
}
module.exports=UserController;