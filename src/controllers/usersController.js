const { UploadImage }=require('../apis/imgur')
const { hashPassword,verifyPassword } =require('../utils/password');
const { createJWT,getDataFromToken}= require('../utils/jwt');
const { Users }=require('../models/usersModel');
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
                    await Users.update({ img: link }, {
                        where: {id: user.id}
                    });
                    user.img=link;
                };
            };
            //redirect to confirm account
            return res.status(200).json(user);
        }
        catch(err){
            return res.status(500).json(err);
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
            return res.status(400).json('teste');
        }
        catch(err){
            return res.status(400).json(err.message);
        }
    }
    static update(req,res){
        try{

        }
        catch(err){

        }
    }
    static resetPassword(req,res){
        try{

        }
        catch(err){

        }
    }
    static activeUser(req,res){
        try{

        }
        catch(err){

        }
    }
}
module.exports=UserController;