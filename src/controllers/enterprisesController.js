const { Enterprises } = require("../models/enterprisesModel");
const { Enterprise_users } = require("../models/enterprise_usersModel");
class EnterpriseController{
    static showCreateForm(req,res){
        return res.render('createEnterprise',{});
    }
    static async createEnterprise(req,res){
        const user=req.data.user;
        const { name } =req.body;   
        const EnterpriseDataRow={name,owner:user.id};
        const enterprise=await Enterprises.create(EnterpriseDataRow);
        const EnterpriseUserDataRow={id_user:user.id,id_enterprise:enterprise.id};
        await Enterprise_users.create(EnterpriseUserDataRow);
        return res.redirect('/enterprises/home');
    }
    static async showHome(req,res){
        const { user }=req.data;
        const { enterprise }=user;
        let owner= (user.id==enterprise.owner) ? true:false; 
        return res.render('homeEnterprise',{user,enterprise,owner});
    }
}
module.exports=EnterpriseController;