const { Users } = require("../models/usersModel");
const { Teams } =require('../models/teamsModel');
const { Teams_invite } =require('../models/teams_inviteModel');
const { Teams_users }= require('../models/teams_usersModel');
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
        //verify invite
    }
    static async inviteUserToTeam(req,res,next){
        
    }
    static async getTeamSchedule(req,res,next){
        
        return res.status(200).json("criar teams home")
    }
    static async getPartiticapnts(req,res,next){
        
    }
    
}
module.exports=TeamsController;