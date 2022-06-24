const { UploadImage }=require('../apis/imgur')
class UserController{
    static async register(req,res){
        try{
            //const { link }=await UploadImage(req.file)
            return res.status(200).json('Register User');
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
    static login(req,res){
        try{

        }
        catch(err){

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