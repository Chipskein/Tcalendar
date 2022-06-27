const jwtConfig=require('../config/jsonwebtoken');
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
    prepareSessionToken:async (Users,userId)=>{
        //pegar os times do usuario tbm;
        let user=await Users.findOne({where: { id:userId },include:{association:"getUserEnterprise"}});
        user=user.dataValues;
        const getUserEnterprise=user.getUserEnterprise;
        if(getUserEnterprise.length>0) user.enterprise=getUserEnterprise[0].dataValues;  
        else user.enterprise=null;

        delete(user.password);
        delete(user.getUserEnterprise);
        
        const token=module.exports.createJWT(user,'session');
        return token;
    },
    prepareTempToken:async (user)=>{
        const token=module.exports.createJWT(user,'temp');
        return token;
    }         
}