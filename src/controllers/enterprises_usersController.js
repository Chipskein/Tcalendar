const { Users } = require("../models/usersModel");
const { Enterprises } = require("../models/enterprisesModel");
const { Enterprise_users } = require("../models/enterprise_usersModel");
const { sendEmail }=require('../utils/email');
class EnterpriseController{
    static async addUser(req,res){
        const { email }=req.body;
        const { user }=req.session;
        
        let userToAdd=await Users.findOne({where:{email}});
        userToAdd=userToAdd.dataValues;
        
        let enterprise=await Enterprises.findOne({where:{id:user.enterprise}});
        enterprise=enterprise.dataValues;

        await Enterprise_users.create({id_user:userToAdd.id,id_enterprise:user.enterprise});
        await sendEmail({
            email:email,
            server_url:req.protocol + '://' + req.get('host'),
            token:false,
            name:userToAdd.name,
            time:false,
            enterprise:enterprise.name
        },'notification_enterprise');
        return res.status(200).json("05_SUCCESS");
    }
}
module.exports=EnterpriseController;