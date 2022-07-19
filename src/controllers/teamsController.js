const { Users } = require("../models/usersModel");
const { Teams } =require('../models/teamsModel');
const { Teams_invite } =require('../models/teams_inviteModel');
const { Teams_users }= require('../models/teams_usersModel');
const { sendEmail }=require('../utils/email');
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
            const teamId=req.params.id;
            const { email }=req.body;
            const userAdmin=req.data;
            let team=await Teams.findOne({where:{id:teamId}});
            team = team ? team.dataValues:false
            if(!team) throw Error('Time não existe');

            //user exists
            let user=await Users.findOne({where:{ email }});
            user = user ? user.dataValues:false;
            if(user){
                //jwt accept invite
            } else{
                //jwt create accoutn and accept invite
            }
            //insert into Team_invite;
            //create jwt
            //sendmail
            await sendEmail({
                email:email,
                server_url:req.protocol + '://' + req.get('host'),
                token:false,
                name:false,
                time:false,
                enterprise:false
            },'team_invite');
            
            return res.status(200).json({user,team,userAdmin})
        }
        catch(err){

        }
    }
    static async getTeamSchedule(req,res,next){
        
        let team=await Teams.findOne({where:{id:2}});
        team=team.dataValues;
        console.log(team);
    
        return res.render("homeTeams",{team});
    }
    static async getPartiticapnts(req,res,next){
        
    }
    
}
module.exports=TeamsController;