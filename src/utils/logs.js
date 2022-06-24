const colors=require('cli-colors');
const success=colors.green;
const error=colors.red;
const warning=colors.yellow;
const log=colors.cyan;
class LogServices{
    static success(msg){
        console.log(success(`[${new Date().toISOString()}]::::${msg}`));
    }
    static warning(msg){
        console.log(warning(`[${new Date().toISOString()}]::::${msg}`));
    }
    static error(msg){
        console.log(error(`[${new Date().toISOString()}]::::${msg}`));
    }
    static log(msg){
        console.log(log(`[${new Date().toISOString()}]::::${msg}`));
    }
}
module.exports=LogServices;