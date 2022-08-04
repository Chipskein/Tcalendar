const { Users } = require("../models/usersModel");
const { Teams_users } = require("../models/teams_usersModel");
const { Enterprises } = require("../models/enterprisesModel");
const { Enterprise_users } = require("../models/enterprise_usersModel");
const { Schedules } = require("../models/schedulesModel");
class EnterpriseController{
    static showCreateForm(req,res){
        return res.render('createEnterprise',{});
    }
    static async showHome(req,res){
        const { user }=req.data;
        let { enterprise, teams } = user;
        let owner = (user.id == enterprise.owner) ? true:false; 
        const { id }=req.params;
        let selectedTeam = null;
        let members = [];
        if(id){
            selectedTeam = teams.find(item => item.id == id);
            members = await Teams_users.findAll({ where: { id_team: id }, include: Users});
        }

        let schedules = [];
        if(!id){
            let teamsIds = [];
            teams.map(item => { teamsIds.push(item.id) });
            schedules = await Schedules.findAll({ where: { id_team: teamsIds }});
            console.log('schedules ',schedules);
            schedules = JSON.stringify(schedules);
        } else {
            schedules = await Schedules.findAll({ where: { id_team: id }});
            console.log('schedules ',schedules);
            schedules = JSON.stringify(schedules);
        }

        teams = JSON.stringify(teams);

        return res.render('homeEnterprise', { user, enterprise, teams, selectedTeam, schedules, members, owner });
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
    static async updateEnterprise(req,res){
        const user=req.data.user;
        //const EnterpriseDataRow={name,owner:user.id};
        //const enterprise=await Enterprises.create(EnterpriseDataRow);
        //const EnterpriseUserDataRow={id_user:user.id,id_enterprise:enterprise.id};
        //await Enterprise_users.create(EnterpriseUserDataRow);
        return res.redirect('/enterprises/home');
    }
    static async addUserToEnterprise(req,res){
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
                team:false,
                enterprise:enterprise.name
            },'notification_enterprise');
            return res.status(200).json("05_SUCCESS");
        } catch(err){
            return res.status(500).json(err.message);
        }
    }
}
module.exports=EnterpriseController;