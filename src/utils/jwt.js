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
    getUserInfoByToken:async (token)=>{
        const {id,email,token_type} = module.exports.getDataFromToken(token)
       //pegar os times do usuario tbm;
       let user=await Users.findOne({where: { id:id },include:{association:"getUserEnterprise"}});
       user=user.dataValues;
       const getUserEnterprise=user.getUserEnterprise;
       if(getUserEnterprise.length>0) user.enterprise=getUserEnterprise[0].dataValues;  
       else user.enterprise=null;
       delete(user.password);
       delete(user.getUserEnterprise);
       return {user,token,token_type};
    },
}