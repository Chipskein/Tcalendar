const { Schedules }=require('../models/schedulesModel');
const { Teams_users }= require('../models/teams_usersModel');
const { isAValidDate }=require('../utils/date');
async function isDateAvaliable(id_team,date){
    
    //verifica se a data esta alocada para o time nesse horarioa
    const teamSchedule=await Schedules.findOne({
        where:{
            id_team,
            date
        }
    });
    console.log(date)
    const isDateNotAvaliableInTeamSchedule = teamSchedule ? true:false;
    if (isDateNotAvaliableInTeamSchedule) return false;

    //verifica se cada usuario do time tem esse horario disponivel
    const teamUsers=await Teams_users.findAll({where:{id_team}})
    const teamUsersIds=[];
    teamUsers.map(teamUser=>teamUsersIds.push(teamUser.dataValues.id_user))
    const usersSchedules=await Schedules.findAll({where:{
        id_user:teamUsersIds,
        date
    }});
    const isDateNotAvaliableInUserSchedule = usersSchedules.length>0 ? true:false;
    if (isDateNotAvaliableInUserSchedule) return false;
    
    return true;
}
class SchduleController{
    static list(req,res){
        return res.send('TESTANDo');
    }
    static async create(req,res){
        const { id_team,id_user,date }=req.body;
        if(await isDateAvaliable(id_team,date)&&isAValidDate(date)){
            const schedule=await Schedules.create({
                id_team,
                id_user,
                date
            })
            //enviar notifcação para todos do time
            return res.status(200).json(schedule);
        }
        return res.status(200).json('Data não disponivel');
    }
}
module.exports=SchduleController;