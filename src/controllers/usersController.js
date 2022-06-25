const { uploadImage }=require('../utils/image')
const { hashPassword,verifyPassword } =require('../utils/password');
const { Users }=require('../models/usersModel');
const { Enterprises }=require('../models/enterprisesModel');
const { Enterprise_users }=require('../models/enterprise_usersModel');
const { sendEmail }=require('../utils/email')
const { createJWT,getDataFromToken }=require('../utils/jwt');
class UserController{

    static async showRegister(req,res){
        return res.render('register',{err:false});
    }
    static async showHome(req,res){
        const user=req.session.user;
        let enterprise=false;
        //colocar no model
        const userEnterprise=await Enterprise_users.findAll({where:{id_user:user.id,active:true}});
        const isUserInEnterprise= userEnterprise.length>0 ? true:false;
        if(isUserInEnterprise){
            let { id_enterprise } =userEnterprise[0].dataValues;
            enterprise=await Enterprises.findAll({where:{id:id_enterprise}});
            enterprise=enterprise[0].dataValues;
            req.session.user.enterprise=id_enterprise;
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
            let user=await Users.findAll({where: { id }})
            user=user[0].dataValues;  
            req.session.user=user;
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
            let user=await Users.findAll({where: { email }});
            if(user.length==0) return res.render('showForgetPassword',{err:'Usuario nao existe'});   
            user=user[0].dataValues;      
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
            let user=await Users.findAll({where: { email }});
            if(user.length==0) return res.render('login',{err:'Usuario nao existe'});   
            user=user[0].dataValues;      
            if(user.active){      
                if(verifyPassword(password,user.password)){
                    delete(user.password);
                    req.session.user=user;
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
            req.session.user=null;
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
                req.session.user.name=name;
            };
            if(email){
                updateDataRow.email=email;
                req.session.user.email=email;
            };
            if(file&&(file.mimetype=='image/jpeg'||file.mimetype=='image/gif'||file.mimetype=='image/png')){
                const { link }=await uploadImage(req.file)
                if(link){
                    updateDataRow.img=link;
                    req.session.user.img=link;
                };
            };
            await Users.update(updateDataRow,{where: { id:req.session.user.id }});
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
            let user=await Users.findAll({where: { id }})
            user=user[0].dataValues; 
            req.session.user=user;
            return res.redirect('/users/home');
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
}
module.exports=UserController;