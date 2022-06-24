const { UploadImage }=require('../apis/imgur')
const { hashPassword,verifyPassword } =require('../utils/password');
const { Users }=require('../models/usersModel');
const { createJWT,getDataFromToken }=require('../utils/jwt');
class UserController{

    static async showRegister(req,res){
        return res.render('register');
    }
    static async showHome(req,res){
        return res.render('home');
    }
    static async showLogin(req,res){
        return res.render('login');
    }
    static async showResetPasswordForm(req,res){
        try{
            const { token }=req.query;
            const { id } = getDataFromToken(token);
            let user=await Users.findAll({where: { id }})
            req.session.user=user;
            return res.render('forgetPassword.ejs',{user});
        }
        catch(err){
            return res.status(400).json(err.message);
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
                const { link }=await UploadImage(req.file)
                if(link){
                    user.img=link;
                    await user.save();
                };
            };
            const data=user.toJSON()
            //send mail
            return res.render('active_account',{user:data});
        }
        catch(err){
            return res.status(500).json(err.message);
        }
    }
    static async login(req,res){
        try{
            const { email,password }=req.body;
            let user=await Users.findAll({where: { email }});
            if(user.length==0) throw Error('Usuário não Encontrado')
            user=user[0].dataValues;      
            if(user.active==1){      
                if(verifyPassword(password,user.password)){
                    delete(user.password);
                    req.session.user=user;
                    return res.redirect('/home');
                } else{
                    return res.redirect('/login');
                }
            } else{
                //send mail
                return res.render('active_account',{user:data});
            }
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
    static async logoff(req,res){
        try{
            req.session.user={};
            return res.redirect('/login');
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
                req.session.name=name;
            };
            if(email){
                updateDataRow.email=email;
                req.session.name=email;
            };
            if(file&&(file.mimetype=='image/jpeg'||file.mimetype=='image/gif'||file.mimetype=='image/png')){
                const { link }=await UploadImage(req.file)
                if(link){
                    updateDataRow.img=link;
                    req.session.img=link;
                };
            };
            await Users.update(updateDataRow,{where: { id }});
            return res.redirect('/home');
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
            req.session.user=user;
            return res.redirect('/home');
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
}
module.exports=UserController;