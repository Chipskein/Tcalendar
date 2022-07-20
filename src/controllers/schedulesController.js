const { Schedules }=require('../models/schedulesModel');
const { isAValidDate }=require('../utils/date');
class SchduleController{
    static list(req,res){
        return res.send('TESTANDo');
    }
    static async create(req,res){
        const { id_team,id_user,date }=req.body

        //verificar se horario esta alocado
        


        
        if(isAValidDate(date)){
            const schedule=await Schedules.create({
                id_team,
                id_user,
                date
            })
            //enviar notifcação para todos do time
            return res.status(200).json(schedule);
        }
    }
}
module.exports=SchduleController;