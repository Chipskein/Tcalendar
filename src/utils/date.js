const Holidays=require('date-holidays');
const hd=new Holidays();
const start_hour=8;
const end_hour=16;
module.exports={
    isAValidDate:(dateString)=>{
        const date = new Date(dateString);
        const weekday= date.getDay();
        const isABussinessDay = weekday > 0 && weekday < 6 && !hd.isHoliday(date) ? true : false;
        
        if(!isABussinessDay) {
            return false
        }
        
        const hours=date.getHours();
        const isAValidHour=hours>=start_hour&&hours<end_hour? true:false ;

        if(!isAValidHour) {
            return false
        } else {
            return true;
        }
    }
}