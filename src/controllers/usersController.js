const { UploadImage }=require('../apis/imgur')
const { hashPassword,verifyPassword } =require('../utils/password');
const { Users }=require('../models/usersModel');
const { createJWT,getDataFromToken }=require('../utils/jwt');
class UserController{
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
            const data=user.toJSON
            return res.status(200).json(data);
        }
        catch(err){
            console.log(err);
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
                    //redirect to home
                    return res.status(200).json(user);
                } else{
                    return res.status(401).json('Login inválido');
                }
            } else{
                //redirect to active account;
                return res.status(200).json('Ative seu usuario');
            }
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
    static async logoff(req,res){
        try{
            req.session.user={};
            return res.redirect('/');
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
    static async update(req,res){
        try{

        }
        catch(err){

        }
    }
    static async resetPassword(req,res){
        try{

        }
        catch(err){

        }
    }
    static async activeUser(req,res){
        try{
            const { token }=req.query;
            const { id } = getDataFromToken(token);
            await Users.update({ active: true },{where: { id }});
            let user=await Users.findAll({where: { id }})
            user=user[0].dataValues
            return res.status(200).json(user);
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
}
module.exports=UserController;