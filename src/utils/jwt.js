const jwtConfig=require('../config/jsonwebtoken');
const { Users } = require('../models/usersModel');
module.exports={
    createJWT:(data,type)=>{
        let config={}
        switch(type){
            case 'temp':
                config=jwtConfig.configTempJWTToken();
                break;
            case 'session':
                config=jwtConfig.configSessionJWTToken();
                break;
            case 'invite':
                config=jwtConfig.configInviteJWTToken();
                break;
        }
        data.token_type=type;
        const { genToken,key }=jwtConfig.getInstance()
        const token=genToken(data,key,config);
        return token;
    },
    getDataFromToken:(token)=>{
        const { checkToken,key }=jwtConfig.getInstance();
        const tokenData = checkToken(token,key);
        return tokenData;
    },
    getCookie:(cookie,cookietoken)=>{
        const cookiestring=RegExp(cookietoken+"=[^;]+").exec(cookie);
        return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
    },
    prepareSessionToken:async (id,email)=>{        
        const token=module.exports.createJWT({id,email},'session');
        return token;
    },
    prepareTempToken:async (id,email)=>{
        const token=module.exports.createJWT({id,email},'temp');
        return token;
    },
    prepareInviteToken:async(user,email,team,enterprise,isNewUser)=>{
        const token=module.exports.createJWT({user,email,team,enterprise,isNewUser},'temp');
        return token;
    },  
    getUserInfoByToken:async (token)=>{
        const {id,email,token_type} = module.exports.getDataFromToken(token)
        let user=await Users.findOne({where: { id:id },include:[{association:"getUserEnterprises"},{association:"getUserTeams"}]});
        user=user.dataValues;
        delete(user.password);     

        const getUserEnterprises=user.getUserEnterprises;
        if(getUserEnterprises.length>0) user.enterprise=getUserEnterprises[0].dataValues;  
        else user.enterprise=null;
        delete(user.getUserEnterprises);

        const getUserTeams=user.getUserTeams;
        user.teams=[];
        if(getUserTeams.length>0) getUserTeams.map(team=>user.teams.push(team.dataValues));
        delete(user.getUserTeams);
        return {user,token,token_type};
    },
}