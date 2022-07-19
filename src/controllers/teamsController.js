const { Users } = require("../models/usersModel");
const { Teams } =require('../models/teamsModel');
const { Teams_invite } =require('../models/teams_inviteModel');
const { Teams_users }= require('../models/teams_usersModel');
const { sendEmail }=require('../utils/email');
const { prepareInviteToken }=require('../utils/jwt');
class TeamsController{

    static async getCreateTeam(req,res,next){
        return res.render('createTeam');
    }
    static async createTeam(req,res,next){
        //create team
        const { user }=req.data;
        const { enterprise }= user;
        const { name,description } = req.body;
        const TeamsDataRow={
            name,
            description,
            admin:user.id,
            id_enterprise:enterprise.id,        
        }
        const team = await Teams.create(TeamsDataRow);
        const TeamUserDataRow={
            id_user:user.id,
            id_team:team.id
        };
        await Teams_users.create(TeamUserDataRow);
        return res.redirect('/');
    }
    static async addUserToTeam(req,res,next){
        const { token }=req.query;
        //case accepted
        //update Team_invte
        //insert Team_users

    }
    static async inviteUserToTeam(req,res,next){
        try{
            const teamId = req.params.id;
            const { email } = req.body;
            const  userAdmin  = req.data.user;
            const { enterprise } = userAdmin;
            let team=await Teams.findOne({where:{id:teamId}});
            team = team ? team.dataValues:false
            if(!team) throw Error('Time não existe');
            let user=await Users.findOne({where:{ email }});
            user = user ? user.dataValues:false;
            const isNewUser= user ? false:true;
            if(isNewUser) user=await Users.create({email,password:'',name:''});
            await Teams_invite.upsert({
                id_team:teamId,
                id_user:user.id,
                status:"waiting"
            });
            await sendEmail({
                email:email,
                server_url:req.protocol + '://' + req.get('host'),
                token:await prepareInviteToken(user.id,email,teamId,enterprise.id,isNewUser),
                team:team.name,
                teamId:team.id,
                enterprise:enterprise.name
            },'team_invite');
                 
            return res.redirect(`/team/${team.id}`);
        }
        catch(err){
            return res.status(400).json(err)
        }
    }
    static async getTeamSchedule(req,res,next){
        const { id }=req.params;
        let team = await Teams.findOne({where:{id}});
        team = team.dataValues;
        return res.render("homeTeams",{team});
    }
    static async getPartiticapnts(req,res,next){
        
    }
    
}
module.exports=TeamsController;