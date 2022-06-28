const { Users } = require("../models/usersModel");
const { Enterprise_users } = require("../models/enterprise_usersModel");
const { sendEmail }=require('../utils/email');
class EnterpriseController{
    static async addUser(req,res){
        try{
            const { email }=req.body;
            const { user }=req.data;
            const { enterprise } =user;
            let userToAdd=await Users.findOne({where:{email}});
            if(!userToAdd) throw new Error('Usuario nao encontrado');
            userToAdd=userToAdd.dataValues;
            await Enterprise_users.create({id_user:userToAdd.id,id_enterprise:enterprise.id});
            await sendEmail({
                email:email,
                server_url:req.protocol + '://' + req.get('host'),
                token:false,
                name:userToAdd.name,
                time:false,
                enterprise:enterprise.name
            },'notification_enterprise');
            return res.status(200).json("05_SUCCESS");
        } catch(err){
            return res.status(500).json(err.message);
        }
    }
}
module.exports=EnterpriseController;