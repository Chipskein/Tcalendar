const { Enterprises } = require("../models/enterprisesModel");
const { Enterprise_users } = require("../models/enterprise_usersModel");
class EnterpriseController{
    static showCreateForm(req,res){
        return res.render('createEnterprise',{});
    }
    static async createEnterprise(req,res){
        const user=req.session.user;
        const { name } =req.body;   
        const EnterpriseDataRow={name,id_owner:user.id};
        const enterprise=await Enterprises.create(EnterpriseDataRow);
        const EnterpriseUserDataRow={id_user:user.id,id_enterprise:enterprise.id};
        const enterpriseUsers=await Enterprise_users.create(EnterpriseUserDataRow);
        return res.send(enterpriseUsers.toJSON());
    }
}
module.exports=EnterpriseController;