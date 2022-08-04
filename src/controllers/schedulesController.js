const { Schedules }=require('../models/schedulesModel');
const { Teams_users }= require('../models/teams_usersModel');
const { rawQuery }=require('../config/sequelize')
const { isAValidDate }=require('../utils/date');
async function verifyUsersSchedule(teamUsersIds,date){
        const query=`
            select  
            "Schedules"."id"
            from 
            "Teams_users"
            join "Teams" on "Teams"."id" = "Teams_users"."id_team"
            join "Schedules" on "Schedules"."id_team"="Teams"."id"
            where
                "Teams_users"."id_user" in (${teamUsersIds.join(',')})
                and "Schedules"."date" = '${new Date(date).toISOString()}'
	    `;
        const usersSchedules=await rawQuery(query);
        const isDateAvaliableInUserSchedule = !usersSchedules.length > 0 ? true : false;
        return isDateAvaliableInUserSchedule;
    
}
async function isDateAvaliable(id_team,date){

    const teamSchedule=await Schedules.findOne({
        where:{
            id_team,
            date
        }
    });
    const isDateNotAvaliableInTeamSchedule = teamSchedule ? true:false;
    if (isDateNotAvaliableInTeamSchedule) return false;
    const teamUsers=await Teams_users.findAll({where:{id_team}})
    const teamUsersIds=[];
    teamUsers.map(teamUser=>teamUsersIds.push(teamUser.dataValues.id_user))
    const isDateAvaliableInUserSchedule=await verifyUsersSchedule(teamUsersIds,date);
    if (!isDateAvaliableInUserSchedule) {
        return false;
    } else {
        return true;
    }
}
class SchduleController{
    static list(req,res){
        return res.send('TESTANDo');
    }
    static async create(req,res){
        const { id_team, id_user, date, time, title, description }=req.body;
        let formatedDate = new Date(date+" "+time+":00")
        // console.log('formatedDate ',formatedDate)
        // console.log('id_team ',id_team)
        try {
            let testee = await isDateAvaliable(id_team, formatedDate);
            let testee2 = isAValidDate(formatedDate);
            if(await isDateAvaliable(id_team, formatedDate) && isAValidDate(formatedDate)){
                const schedule=await Schedules.create({
                    id_team,
                    id_user,
                    date: formatedDate,
                    title,
                    description,
                })
                //enviar notifcação para todos do time
                return res.redirect('/enterprises/home/');
            } else {
                return res.status(400).json('Data não disponivel');
            }
        } catch (error) {
            return res.json({error});
        }
    }
}
module.exports=SchduleController;
