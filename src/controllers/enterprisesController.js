const { Users } = require("../models/usersModel");
const { Teams } =require('../models/teamsModel');
const { Teams_invite } =require('../models/teams_inviteModel');
const { Teams_users }= require('../models/teams_usersModel');
class TeamsController{
    static async createTeam(req,res,next){
        //create team
        const { user }=req.data
        const { name,description } = req.body;
        return res.send('porra');
    }
    static async addUserToTeam(req,res,next){
        //verify invite
    }
    static async inviteUserToTeam(req,res,next){
        // if user exists send invite
        //else send special invite by email
    }
}
module.exports=TeamsController;